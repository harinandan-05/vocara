import {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { githubUrlSchema } from "../zod.schema";
import GithubContextBuilder from "../service/github/GithubContext";
import { setInterviewContext } from "../lib/interviewContext";
import { prisma } from "../db.prisma";

export const githubController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const interviewIdParam = req.params.interviewId;
    const interviewId = Array.isArray(interviewIdParam)
      ? interviewIdParam[0]
      : interviewIdParam;
    const result = githubUrlSchema.safeParse(req.body);

    if (!interviewId) {
      return res.status(400).json({ msg: "missing interview id" });
    }

    if (!result.success) {
      return res.status(400).json({ msg: "incorrect url" });
    }

    const responseContext = await GithubContextBuilder(result.data.githubUrl);

    await prisma.interview.create({
      data: {
        id: interviewId,
        githubUrl: result.data.githubUrl,
        githubContext: responseContext,
      },
    });

    setInterviewContext(interviewId, responseContext);

    return res.status(200).json({
      msg: "data fetched",
      interviewId,
      response: responseContext,
    });
  } catch (err) {
    throw err;
  }
};
