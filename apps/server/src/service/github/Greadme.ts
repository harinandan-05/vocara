import axios from "axios"
import pLimit from "p-limit";

interface repoData { 
    id:number,
    name:string,
    description:string | null,
    html_url:string,
    language:string | null,
    fork:boolean,
    stars:number,
    visibility: string,
    size:number,
    topics:string,
    pushed_at:string,
    created_at:string,
    owner:string
}

const limit = pLimit(3);

export async function getGithubReadme(data:repoData[]){

    const tasks = data.map((repo) => 
    limit(async() => {
        const owner = repo.owner
        const name = repo.name
        console.log(`https://api.github.com/repos/${owner}/${name}/readme`);
        const response = await axios.get(`https://api.github.com/repos/${owner}/${name}/readme`)
        const decode = Buffer.from(
            response.data.content,
            "base64"
        ).toString("utf-8")
        return {
            ...repo,
            readmeData:decode
        }
    })
    )
    const results = await Promise.allSettled(tasks);
    console.log("readme data" , results);
    return results;
}