import express from 'express';
import { githubController } from '../controllers/githubController';
import { messageController } from '../controllers/messageController';

const dataRoute = express.Router();

dataRoute.post('/pre-interview/url/:interviewId', githubController);
dataRoute.post('/user-message/:interviewId', messageController);
export default dataRoute;