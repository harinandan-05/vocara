"use client";

import { useEffect, useRef, useState } from "react";

export default function Interview() {

  const [room, setRoom] = useState(null);
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    (async() => {

        // Create a peer connection
const pc = new RTCPeerConnection();

// Set up to play remote audio from the model
audioRef.current = document.createElement("audio");
audioRef.current.autoplay = true;
pc.ontrack = (e) => (audioRef.current!.srcObject = e.streams[0]);

// Add local audio track for microphone input in the browser
const ms = await navigator.mediaDevices.getUserMedia({
  audio: true,
});
pc.addTrack(ms.getTracks()[0]);



// Start the session using the Session Description Protocol (SDP)
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);

const sdpResponse = await fetch("api/v1/session", {
  method: "POST",
  body: offer.sdp,
  headers: {
    "Content-Type": "application/sdp",
  },
});

const answer = {
  type: "answer" as "answer",
  sdp: await sdpResponse.text(),
};
await pc.setRemoteDescription(answer);
    })()
      
  }, [room]);


  return (
    <div>
        <audio ref={audioRef} autoPlay>

        </audio>
    </div>
  )
}


