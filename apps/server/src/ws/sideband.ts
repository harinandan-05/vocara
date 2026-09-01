import WebSocket from "ws";


export default async function Sideband(callId: string, interviewId: string,gitHubContext:string) {
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


  ws.on("open", function open() {
    console.log("Connected to server.");

    ws.send(
      JSON.stringify({
        type: "session.update",
        session: {
          type: "realtime",
          instructions:
            "Be extra nice today! you are supposed to take interview on computer knowledge of a person for Christ University and follow English. Stick to it.",
        },
      }),
    );
  });

  ws.on("message", function incoming(message) {
    console.log(JSON.parse(message.toString()));
  });

  ws.on("error", (error) => {
    console.error("Realtime websocket error:", error);
  });
}



