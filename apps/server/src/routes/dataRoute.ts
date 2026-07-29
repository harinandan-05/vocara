import express from 'express'
import { githubController } from '../controllers/githubController'

const dataRoute = express.Router()

dataRoute.post('/dataurl', githubController)


export default dataRoute;