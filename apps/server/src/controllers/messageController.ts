import {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { prisma } from "../db.prisma";

export const messageController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userTranscript = req.body.userMessage;
        const interviewIdParam = req.params.interviewId;
        const interviewId = Array.isArray(interviewIdParam)
            ? interviewIdParam[0]
            : interviewIdParam;

        if (typeof userTranscript !== "string" || !userTranscript.trim() || !interviewId) {
            return res.status(400).json({
                msg: "user transcript and interviewId are required",
            });
        }

        const data = await prisma.userTranscript.create({
            data: {
                transcript: userTranscript.trim(),
                interview: {
                    connect: { id: interviewId },
                },
            },
        });

        return res.status(201).json({ data });
    } catch (error) {
        return next(error);
    }
};