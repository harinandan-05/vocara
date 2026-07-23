import express from 'express'
import { type Request , type Response } from 'express'

const dataRoute = express.Router()

dataRoute.post('/dataurl', async(req:Request,res:Response) => {
    const {linkedinUrl , githubUrl} = req.body;
  

    if(!linkedinUrl|| !githubUrl){
        return res.json({msg:"no payload recived"})
    }


    return res.status(200).json({msg:"url recived"})
})

export default dataRoute;