import express from 'express'
import axios from 'axios'
import { type Request , type Response } from 'express'

const dataRoute = express.Router()

dataRoute.post('/dataurl', async(req:Request,res:Response) => {
    const {linkedinUrl , githubUrl} = req.body;
  

    if(!linkedinUrl|| !githubUrl){
        return res.json({msg:"no payload recived"})
    }

    const Githubusername = githubUrl.split("/")[3];

    const response = await axios.get(`https://api.github.com/users/${Githubusername}/repos`);

    const data = response.data.map((repo:any) => {
        return {
            id:repo.id,
            name:repo.name,
            description:repo.description,
            repo_url:repo.html_url,
            language:repo.language
        }
    })
    

    return res.status(200).json({msg:"url recived",data})
})

export default dataRoute;