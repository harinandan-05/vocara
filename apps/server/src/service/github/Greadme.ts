import axios from "axios"

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

export async function getGithubReadme(data:repoData[]){

    // hit this endpoint  https://github.com{owner}/{repo}/readme
    // we need owner name
    // we need repo name
    const readmeData = []

    for(const repo of data){
        const username = repo.owner
        const repoName = repo.name

        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/readme`)

        const decode = Buffer.from(
            response.data.content,
            "base64"
        ).toString("utf-8")

        readmeData.push({
            ...repo,
            readme:decode
        })
    }

    return readmeData;
}