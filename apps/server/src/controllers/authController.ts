import { type Request, type Response, type NextFunction } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import { prisma } from "../db.prisma";

const JWT_SECRET = process.env.JWT_SECRET || "vocara_oauth_jwt_secret_token_2026";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

export const googleAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { credential, code } = req.body;

    if (!credential && !code) {
      return res.status(400).json({ error: "Missing Google credential or code" });
    }

    let email = "";
    let name = "";
    let picture = "";
    let googleId = "";

    if (credential) {
      const verifyRes = await axios.get(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
      );
      const data = verifyRes.data;

      email = data.email;
      name = data.name || data.given_name || "Vocara User";
      picture = data.picture || "";
      googleId = data.sub;
    } else if (code) {
      const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: "postmessage",
        grant_type: "authorization_code",
      });

      const { id_token, access_token } = tokenRes.data;
      if (id_token) {
        const verifyRes = await axios.get(
          `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`
        );
        email = verifyRes.data.email;
        name = verifyRes.data.name || "Vocara User";
        picture = verifyRes.data.picture || "";
        googleId = verifyRes.data.sub;
      } else {
        const userinfoRes = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${access_token}` },
          }
        );
        email = userinfoRes.data.email;
        name = userinfoRes.data.name || "Vocara User";
        picture = userinfoRes.data.picture || "";
        googleId = userinfoRes.data.sub;
      }
    }

    if (!email) {
      return res.status(400).json({ error: "Failed to extract user email from Google" });
    }

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        avatarUrl: picture,
        googleId,
      },
      create: {
        email,
        name,
        avatarUrl: picture,
        googleId,
        role: "candidate",
      },
    });

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Google Auth error:", error?.response?.data || error.message);
    return res.status(500).json({
      error: error?.response?.data?.error_description || error.message || "Authentication failed",
    });
  }
};

export const getMeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Missing token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (!decoded?.userId) {
      return res.status(401).json({ error: "Invalid session token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
        interviews: {
          select: {
            id: true,
            githubUrl: true,
            createdAt: true,
            evaluation: {
              select: {
                overallScore: true,
                verdict: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(401).json({ error: "Session expired or invalid" });
  }
};
