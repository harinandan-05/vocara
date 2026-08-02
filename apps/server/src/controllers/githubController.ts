import {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { githubUrlSchema } from "../zod.schema";
import Gwrapper from "../service/github/Gwrapper";

export const githubController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = githubUrlSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ msg: "incorrect url" });
    }

    const response = await Gwrapper(result.data.githubUrl);

    if (!response) {
      return res.status(400).json({
        success: false,
        errors: result.error,
      });
    }

    return res.status(200).json({ msg: "data fetched ", response });
  } catch (err) {
    throw err;
  }
};
