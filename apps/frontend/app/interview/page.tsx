"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { DeepgramClient } from "@deepgram/sdk";

export default function Interview() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const searchParams = useSearchParams();
  const client = new DeepgramClient();

  useEffect(() => {
    const interviewId = searchParams.get("interviewId") ?? "demo-interview";

    (async () => {
      try {
        const pc = new RTCPeerConnection();
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

        audioRef.current = document.createElement("audio");
        audioRef.current.autoplay = true;
        pc.ontrack = (e) => {
          if (audioRef.current) {
            audioRef.current.srcObject = e.streams[0];
          }
        };


        const ms = await navigator.mediaDevices.getUserMedia({ audio: true });

         const socket = new WebSocket(
    `wss://://deepgram.com`,
    ['token', process.env.DEEPGRAM_API_KEY! ?? "97f06900df4798b9fb55110ab794daf0b234dbf6"]
  );

  socket.onopen = () => {
    const mediarecorder = new MediaRecorder(ms,{ mimeType: 'video/webm' })
    mediarecorder.start(250)


    mediarecorder.addEventListener('dataavailable',(e) => {
      socket.send(e.data)
    })

  }

  socket.onmessage = (e) =>{
    const recved = JSON.parse(e.data);
    const transcript = recved.channel.alternatives[0].transcript;

    if(transcript){
      console.log("final",transcript)
    }
  }


      //   pc.addTrack(ms.getTracks()[0]);

      //   const offer = await pc.createOffer();
      //   await pc.setLocalDescription(offer);

      //   const sdpResponse = await fetch(`${apiBaseUrl}/api/v1/session/${interviewId}`, {
      //     method: "POST",
      //     body: offer.sdp,
      //     headers: {
      //       "Content-Type": "application/sdp",
      //     },
      //   });

      //   if (!sdpResponse.ok) {
      //     throw new Error(`Failed to create session: ${await sdpResponse.text()}`);
      //   }

      //   const answer = {
      //     type: "answer" as const,
      //     sdp: await sdpResponse.text(),
      //   };

      //   await pc.setRemoteDescription(answer);
      } catch (error) {
        console.error("Interview setup failed:", error);
      }
    })();
  }, [searchParams]);

  return (
    <div>
      <h1>Interview going on</h1>
      <audio ref={audioRef} autoPlay />
    </div>
  );
}


