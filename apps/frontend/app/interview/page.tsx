"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  AudioWaveform,
  Mic,
  MicOff,
  PhoneOff,
  ShieldCheck,
  Subtitles,
  Bot,
  User,
  AlertCircle,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function InterviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const interviewId = searchParams.get("interviewId") ?? "demo-interview";

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [lastTranscript, setLastTranscript] = useState<string>("");
  const [showCaptions, setShowCaptions] = useState(true);
  const [showEndModal, setShowEndModal] = useState(false);
  const [isEnding, setIsEnding] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [modelAudioLevel, setModelAudioLevel] = useState(0);
  const [userAudioLevel, setUserAudioLevel] = useState(0);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

  async function sendUserTranscript(transcript: string) {
    try {
      await axios.post(`${apiBaseUrl}/api/v1/user-message/${interviewId}`, {
        userMessage: transcript,
      });
    } catch (err) {
      console.error("Failed to post user transcript:", err);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const cleanupMedia = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    try {
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    } catch (e) {
      console.warn("AudioContext cleanup:", e);
    }

    try {
      if (recorderRef.current && recorderRef.current.state !== "inactive") {
        recorderRef.current.stop();
      }
    } catch (e) {
      console.warn("Recorder cleanup:", e);
    }

    try {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    } catch (e) {
      console.warn("Socket cleanup:", e);
    }

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    } catch (e) {
      console.warn("Stream cleanup:", e);
    }

    try {
      if (pcRef.current) {
        pcRef.current.close();
      }
    } catch (e) {
      console.warn("RTCPeerConnection cleanup:", e);
    }
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      if (audioTracks.length > 0) {
        const nextState = !audioTracks[0].enabled;
        audioTracks[0].enabled = nextState;
        setIsMuted(!nextState);
        if (!nextState) {
          setUserAudioLevel(0);
        }
      }
    }
  };

  const handleEndInterview = () => {
    setIsEnding(true);
    cleanupMedia();
    router.push(`/interview/result?interviewId=${interviewId}`);
  };

  useEffect(() => {
    let isSubscribed = true;

    async function initSession() {
      try {
        const pc = new RTCPeerConnection();
        pcRef.current = pc;

        if (!audioRef.current) {
          audioRef.current = document.createElement("audio");
          audioRef.current.autoplay = true;
        }

        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioCtx = new AudioCtxClass();
        audioContextRef.current = audioCtx;

        const userAnalyser = audioCtx.createAnalyser();
        userAnalyser.fftSize = 64;
        const userBuf = new Uint8Array(userAnalyser.frequencyBinCount);

        const modelAnalyser = audioCtx.createAnalyser();
        modelAnalyser.fftSize = 64;
        const modelBuf = new Uint8Array(modelAnalyser.frequencyBinCount);

        pc.ontrack = (e) => {
          if (audioRef.current) {
            audioRef.current.srcObject = e.streams[0];
          }
          try {
            const modelSource = audioCtx.createMediaStreamSource(e.streams[0]);
            modelSource.connect(modelAnalyser);
          } catch (modelSrcErr) {
            console.warn("Model analyser attach:", modelSrcErr);
          }
        };

        const ms = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        streamRef.current = ms;

        try {
          const userSource = audioCtx.createMediaStreamSource(ms);
          userSource.connect(userAnalyser);
        } catch (uSrcErr) {
          console.warn("User analyser attach:", uSrcErr);
        }

        const updateAudioLevels = () => {
          if (!isSubscribed) return;

          userAnalyser.getByteFrequencyData(userBuf);
          let userSum = 0;
          for (let i = 0; i < userBuf.length; i++) userSum += userBuf[i];
          const userAvg = userSum / userBuf.length;
          setUserAudioLevel(Math.min(100, Math.round((userAvg / 128) * 100)));

          modelAnalyser.getByteFrequencyData(modelBuf);
          let modelSum = 0;
          for (let i = 0; i < modelBuf.length; i++) modelSum += modelBuf[i];
          const modelAvg = modelSum / modelBuf.length;
          setModelAudioLevel(Math.min(100, Math.round((modelAvg / 128) * 100)));

          animFrameRef.current = requestAnimationFrame(updateAudioLevels);
        };
        animFrameRef.current = requestAnimationFrame(updateAudioLevels);

        const deepgramApiKey =
          process.env.DEEPGRAM_API_KEY || "97f06900df4798b9fb55110ab794daf0b234dbf6";
        const socket = new WebSocket(`wss://api.deepgram.com/v1/listen`, [
          "token",
          deepgramApiKey,
        ]);
        socketRef.current = socket;

        socket.onopen = () => {
          try {
            const mediaRecorder = new MediaRecorder(ms, { mimeType: "video/webm" });
            recorderRef.current = mediaRecorder;
            mediaRecorder.start(250);

            mediaRecorder.addEventListener("dataavailable", (e) => {
              if (socket.readyState === WebSocket.OPEN && e.data.size > 0) {
                socket.send(e.data);
              }
            });
          } catch (recErr) {
            console.warn("MediaRecorder init fallback:", recErr);
          }
        };

        socket.onmessage = async (e) => {
          try {
            const recved = JSON.parse(e.data);
            const transcript = recved?.channel?.alternatives?.[0]?.transcript;

            if (transcript && transcript.trim()) {
              setLastTranscript(transcript.trim());
              await sendUserTranscript(transcript.trim());
            }
          } catch (parseErr) {
            console.warn("Transcript parse error:", parseErr);
          }
        };

        pc.addTrack(ms.getTracks()[0]);

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const sdpResponse = await fetch(`${apiBaseUrl}/api/v1/session/${interviewId}`, {
          method: "POST",
          body: offer.sdp,
          headers: {
            "Content-Type": "application/sdp",
          },
        });

        if (!sdpResponse.ok) {
          throw new Error(`Failed to establish session: ${await sdpResponse.text()}`);
        }

        const answer = {
          type: "answer" as const,
          sdp: await sdpResponse.text(),
        };

        await pc.setRemoteDescription(answer);
      } catch (err: any) {
        console.error("Interview setup failed:", err);
        if (isSubscribed) {
          setErrorMessage(
            err?.message || "Failed to establish voice session with interviewer."
          );
        }
      }
    }

    initSession();

    return () => {
      isSubscribed = false;
      cleanupMedia();
    };
  }, [interviewId, apiBaseUrl]);

  const isModelSpeaking = modelAudioLevel > 12;
  const isUserSpeaking = !isMuted && userAudioLevel > 12;

  if (isEnding) {
    return (
      <div className="h-screen w-screen bg-[#121214] flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-4">
          <Brain className="w-6 h-6 text-purple-400 animate-spin" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight">Concluding Meeting...</h2>
        <p className="mt-1 text-xs text-zinc-400">
          Disconnecting audio channels and preparing candidate evaluation report.
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#121214] text-white flex flex-col justify-between overflow-hidden select-none font-sans">
      <header className="h-12 border-b border-zinc-800/80 bg-zinc-900/70 px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#6D28D9] text-white">
            <AudioWaveform className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-semibold text-zinc-200">
              Technical Screening
            </span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
              vocara.meet/{interviewId.slice(0, 8)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700/60 text-xs font-mono text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span>{formatTime(secondsElapsed)}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-800/40 px-2.5 py-1 rounded-md border border-zinc-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Anti-Cheat Verified</span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-3 sm:p-5 max-w-7xl mx-auto w-full flex flex-col justify-center min-h-0">
        {errorMessage && (
          <div className="mb-3 p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 h-full max-h-[72vh] items-stretch">
          <div
            className={`relative rounded-2xl bg-zinc-900/90 border transition-all duration-200 flex flex-col items-center justify-center overflow-hidden shadow-md ${
              isModelSpeaking
                ? "border-purple-500/80 ring-2 ring-purple-500/20"
                : "border-zinc-800/90"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-800 border flex items-center justify-center transition-all duration-200 ${
                  isModelSpeaking
                    ? "border-purple-400 scale-105 shadow-lg shadow-purple-950/50"
                    : "border-zinc-700/70"
                }`}
              >
                <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-300" />

                {isModelSpeaking && (
                  <div className="absolute -inset-2 rounded-full border border-purple-500/40 animate-ping opacity-60" />
                )}
              </div>

              <div className="flex items-center gap-1.5 h-6 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50">
                {[0.4, 0.9, 0.6, 1.0, 0.5].map((multiplier, idx) => {
                  const barHeight = isModelSpeaking
                    ? Math.max(5, Math.round((modelAudioLevel / 100) * 20 * multiplier))
                    : 4;
                  return (
                    <span
                      key={idx}
                      className={`w-1 rounded-full transition-all duration-75 ${
                        isModelSpeaking ? "bg-purple-400" : "bg-zinc-600"
                      }`}
                      style={{ height: `${barHeight}px` }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-xs font-medium text-zinc-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Vocara AI Interviewer</span>
            </div>
          </div>

          <div
            className={`relative rounded-2xl bg-zinc-900/90 border transition-all duration-200 flex flex-col items-center justify-center overflow-hidden shadow-md ${
              isUserSpeaking
                ? "border-emerald-500/80 ring-2 ring-emerald-500/20"
                : "border-zinc-800/90"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-800 border flex items-center justify-center transition-all duration-200 ${
                  isUserSpeaking
                    ? "border-emerald-400 scale-105 shadow-lg shadow-emerald-950/50"
                    : "border-zinc-700/70"
                }`}
              >
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-300" />

                {isUserSpeaking && (
                  <div className="absolute -inset-2 rounded-full border border-emerald-500/40 animate-ping opacity-60" />
                )}
              </div>

              <div className="flex items-center gap-1.5 h-6 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50">
                {[0.4, 0.9, 0.6, 1.0, 0.5].map((multiplier, idx) => {
                  const barHeight = isUserSpeaking
                    ? Math.max(5, Math.round((userAudioLevel / 100) * 20 * multiplier))
                    : 4;
                  return (
                    <span
                      key={idx}
                      className={`w-1 rounded-full transition-all duration-75 ${
                        isUserSpeaking ? "bg-emerald-400" : isMuted ? "bg-rose-500/50" : "bg-zinc-600"
                      }`}
                      style={{ height: `${barHeight}px` }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-zinc-800 text-xs font-medium text-zinc-200 shadow-sm">
              <div className={`w-2 h-2 rounded-full ${isMuted ? "bg-rose-500" : "bg-emerald-400"}`} />
              <span>You (Candidate)</span>
            </div>

            <div className="absolute top-3 right-3">
              {isMuted ? (
                <div className="p-1.5 rounded-lg bg-rose-950/80 border border-rose-800/80 text-rose-400" title="Microphone muted">
                  <MicOff className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="p-1.5 rounded-lg bg-zinc-950/60 border border-zinc-800 text-zinc-400" title="Microphone active">
                  <Mic className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>
        </div>

        {showCaptions && (
          <div className="mt-3 w-full max-w-xl mx-auto text-center min-h-[32px] flex items-center justify-center">
            {lastTranscript ? (
              <p className="text-xs text-zinc-300 bg-zinc-900/90 px-3.5 py-1.5 rounded-full border border-zinc-800 line-clamp-1">
                <span className="text-zinc-500 mr-1.5 font-medium">You:</span>
                &ldquo;{lastTranscript}&rdquo;
              </p>
            ) : (
              <span className="text-[11px] text-zinc-500">
                Microphone connected. Speak naturally to respond to questions.
              </span>
            )}
          </div>
        )}
      </main>

      <footer className="h-18 flex items-center justify-center px-4 pb-3 shrink-0">
        <div className="flex items-center gap-3 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 px-5 py-2 rounded-full shadow-xl">
          <button
            type="button"
            onClick={toggleMute}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
              isMuted
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
            }`}
            title={isMuted ? "Unmute microphone" : "Mute microphone"}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => setShowCaptions(!showCaptions)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
              showCaptions
                ? "bg-zinc-700 text-zinc-100"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-400"
            }`}
            title="Toggle closed captions"
          >
            <Subtitles className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setShowEndModal(true)}
            className="h-11 px-5 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 text-xs font-semibold shadow-md shadow-rose-950/40 transition-colors"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Call</span>
          </button>
        </div>
      </footer>

      {showEndModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-2xl text-left space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                <PhoneOff className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Leave & Evaluate?</h3>
                <p className="text-xs text-zinc-400">Generate your performance evaluation</p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Leaving the call will conclude the session. Vocara will evaluate all questions and spoken responses, calculate your score out of 10, and show your final results.
            </p>

            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEndModal(false)}
                className="rounded-lg border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs h-9"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleEndInterview}
                className="rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold h-9 shadow-sm"
              >
                End & View Results
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Interview() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-[#121214] flex items-center justify-center text-zinc-500 text-xs font-mono">
          Connecting to call room...
        </div>
      }
    >
      <InterviewContent />
    </Suspense>
  );
}
