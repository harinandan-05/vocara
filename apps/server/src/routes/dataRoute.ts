import express from 'express';
import { githubController } from '../controllers/githubController';
import { messageController } from '../controllers/messageController';
import {
  evaluateInterviewController,
  getInterviewResultController,
} from '../controllers/evaluationController';

const dataRoute = express.Router();

dataRoute.post('/pre-interview/url/:interviewId', githubController);
dataRoute.post('/user-message/:interviewId', messageController);
dataRoute.post('/interview/:interviewId/evaluate', evaluateInterviewController);
dataRoute.get('/interview/:interviewId/result', getInterviewResultController);

export default dataRoute;