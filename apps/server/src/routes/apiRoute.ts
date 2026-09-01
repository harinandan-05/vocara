import express from "express";
import Sideband from "../ws/sideband";

const apiRoute = express.Router();

const sessionConfig = {
  type: "realtime",
  model: "gpt-realtime-2.1-mini",
  audio: { output: { voice: "marin" } },
};

apiRoute.use(express.text({ type: ["application/sdp", "text/plain"] }));

apiRoute.post("/session/:interviewId", async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY ?? process.env.OPEN_API;

  if (!apiKey) {
    return res.status(500).json({ error: "Missing OpenAI API key." });
  }

  if (typeof req.body !== "string" || !req.body.trim()) {
    return res.status(400).json({ error: "Missing SDP offer body." });
  }

  const fd = new FormData();
  fd.set("sdp", req.body);
  fd.set("session", JSON.stringify(sessionConfig));

  try {
    const r = await fetch("https://api.openai.com/v1/realtime/calls", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "OpenAI-Safety-Identifier": "hashed-user-id",
      },
      body: fd,
    });

    const sdp = await r.text();
    const location = r.headers.get("Location");
    const callId = location?.split("/").pop();

    if (!callId) {
      return res.status(502).json({ error: "Realtime session was not created." });
    }

    const interviewId = req.params.interviewId;
    Sideband(callId, interviewId);

    return res.send(sdp);
  } catch (error) {
    console.error("Token generation error:", error);
    return res.status(500).json({ error: "Failed to generate token" });
  }
});

export default apiRoute;