import { type Request, type Response, type NextFunction } from "express";
import { prisma } from "../db.prisma";
import { generateInterviewEvaluation } from "../service/evaluation/evaluationService";

export const evaluateInterviewController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const interviewIdParam = req.params.interviewId;
    const interviewId = Array.isArray(interviewIdParam)
      ? interviewIdParam[0]
      : interviewIdParam;

    if (!interviewId) {
      return res.status(400).json({ error: "Missing interviewId" });
    }

    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
      include: {
        transcripts: {
          orderBy: { Timestamp: "asc" },
        },
        userTranscript: {
          orderBy: { Timestamp: "asc" },
        },
        evaluation: true,
      },
    });

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    const force = req.body?.force === true;

    if (interview.evaluation && !force) {
      return res.status(200).json({
        cached: true,
        evaluation: interview.evaluation,
        interview: {
          id: interview.id,
          githubUrl: interview.githubUrl,
          createdAt: interview.createdAt,
          transcriptCount: interview.transcripts.length + interview.userTranscript.length,
        },
      });
    }

    const evalData = await generateInterviewEvaluation({
      interviewId,
      githubUrl: interview.githubUrl,
      githubContext: interview.githubContext,
      assistantMessages: interview.transcripts,
      userMessages: interview.userTranscript,
    });

    const savedEvaluation = await prisma.evaluation.upsert({
      where: { interviewId },
      update: {
        overallScore: evalData.overallScore,
        technicalScore: evalData.technicalScore,
        problemSolvingScore: evalData.problemSolvingScore,
        communicationScore: evalData.communicationScore,
        projectKnowledgeScore: evalData.projectKnowledgeScore,
        verdict: evalData.verdict,
        summary: evalData.summary,
        strengths: evalData.strengths,
        improvements: evalData.improvements,
        qnaEvaluation: evalData.qnaEvaluation as any,
      },
      create: {
        interviewId,
        overallScore: evalData.overallScore,
        technicalScore: evalData.technicalScore,
        problemSolvingScore: evalData.problemSolvingScore,
        communicationScore: evalData.communicationScore,
        projectKnowledgeScore: evalData.projectKnowledgeScore,
        verdict: evalData.verdict,
        summary: evalData.summary,
        strengths: evalData.strengths,
        improvements: evalData.improvements,
        qnaEvaluation: evalData.qnaEvaluation as any,
      },
    });

    return res.status(200).json({
      cached: false,
      evaluation: savedEvaluation,
      interview: {
        id: interview.id,
        githubUrl: interview.githubUrl,
        createdAt: interview.createdAt,
        transcriptCount: interview.transcripts.length + interview.userTranscript.length,
      },
    });
  } catch (error: any) {
    console.error("evaluateInterviewController error:", error);
    return res.status(500).json({
      error: error.message || "Failed to evaluate interview",
    });
  }
};

export const getInterviewResultController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const interviewIdParam = req.params.interviewId;
    const interviewId = Array.isArray(interviewIdParam)
      ? interviewIdParam[0]
      : interviewIdParam;

    if (!interviewId) {
      return res.status(400).json({ error: "Missing interviewId" });
    }

    const interview = await prisma.interview.findUnique({
      where: { id: interviewId },
      include: {
        transcripts: {
          orderBy: { Timestamp: "asc" },
        },
        userTranscript: {
          orderBy: { Timestamp: "asc" },
        },
        evaluation: true,
      },
    });

    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }

    return res.status(200).json({
      hasEvaluation: !!interview.evaluation,
      evaluation: interview.evaluation,
      interview: {
        id: interview.id,
        githubUrl: interview.githubUrl,
        createdAt: interview.createdAt,
        transcripts: interview.transcripts,
        userTranscript: interview.userTranscript,
      },
    });
  } catch (error: any) {
    console.error("getInterviewResultController error:", error);
    return res.status(500).json({
      error: error.message || "Failed to fetch interview result",
    });
  }
};
