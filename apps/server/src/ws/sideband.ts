import WebSocket from "ws";
import { prisma } from "../db.prisma";

export default async function Sideband(callId: string, interviewId: string, gitHubContext?: string) {
  const apiKey = process.env.OPENAI_API_KEY ?? process.env.OPEN_API;

  if (!apiKey) {
    console.error("Missing OpenAI API key for realtime WebSocket.");
    return;
  }

  const url = "wss://api.openai.com/v1/realtime?call_id=" + callId;
  const ws = new WebSocket(url, {
    headers: {
      Authorization: "Bearer " + apiKey,
    },
  });

  ws.on("open",async function open() {
    console.log("Connected to server for interview:", interviewId);

    const context = await prisma.interview.findUnique({
      where:{
        id:interviewId
      },
      select:{
        githubContext:true
      }
    })


    if(!context){
      console.log("no context came from controller")
      return 
    }

    const instructions = `
      You are a technical interview interviewer.
      Speak only in English.
      Interview the candidate fairly and professionally.
      ask 1-2 direct question the complex level is hard and straight 
      questions and these all should be based on cantidate github 
      Candidate GitHub context:
      ${context?.githubContext ?? "No GitHub data available."}
    `;

    ws.send(
      JSON.stringify({
        type: "session.update",
        session: {
          type: "realtime",
          instructions,
        },
      }),
    );
  });

  ws.on("message", async function incoming(message) {
    const event = JSON.parse(message.toString())

    if(event.type == "response.audio_transcript.done"){
      const transcript = event.transcript

      const assistantTranscript = await prisma.assistant.create({
        data:{
          id:interviewId,
          transcript:transcript
        }
      })
    }
    
  });

  ws.on("error", (error) => {
    console.error("Realtime websocket error:", error);
  });
}



