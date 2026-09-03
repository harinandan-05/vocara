import axios from "axios";
// import { gAnalyze } from "./Ganalyze";

interface repo {
    id:number,
    name:string,
    description:string | null,
    html_url:string,
    language:string,
    fork:boolean,
    stargazers_count:number,
    visibility: string,
    size:number,
    topics:string,
    pushed_at:string,
    created_at:string,
    owner: {
        login:string
    }
}
export async function getGithubProfile(url:string) {
    const username = new URL(url).pathname.split('/').filter(Boolean)[0];
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
        headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "vocara",
            "X-GitHub-Api-Version": "2022-11-28",
            ...(process.env.GITHUB_TOKEN
                ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
                : {}),
        },
    });
    const data = response.data.map((repo:repo) => {
        return {
            id:repo.id,
            name:repo.name,
            description:repo.description,
            repo_url:repo.html_url,
            language:repo.language,
            fork:repo.fork,
            size:repo.size,
            stargazers_count:repo.stargazers_count,
            visibility:repo.visibility,
            pushed_at:repo.pushed_at,
            created_at:repo.created_at,
            owner:repo.owner.login
        }
    })
    
    return data;
}