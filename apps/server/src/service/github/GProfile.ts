import axios from "axios";
import { da } from "zod/locales";

interface repo {
    id:number,
    name:string,
    description:string | null,
    html_url:string,
    language:string,
    fork:boolean,
    stars:number,
    visibility: string,
    size:number,
    topics:string,
    pushed_at:string,
    created_at:string
}
export async function getGithubProfile(url:string) {
    const username = url.split('/')[3];
    const response = await axios.get(`https://api.github.com/users/${username}/repos`)
    const data = response.data.map((repo:repo) => {
        return {
            id:repo.id,
            name:repo.name,
            description:repo.description,
            repo_url:repo.html_url,
            language:repo.language,
            fork:repo.fork,
            size:repo.size,
            stargazers_count:repo.stars,
            visibility:repo.visibility,
            pushed_at:repo.pushed_at,
            created_at:repo.created_at
        }
    })
    console.log(data)
    return data;
}