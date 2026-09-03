import express from 'express';
import { githubController } from '../controllers/githubController';

const dataRoute = express.Router();

dataRoute.post('/pre-interview/url/:interviewId', githubController);

export default dataRoute;