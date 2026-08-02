import axios from "axios";

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


export async function Glanguage(data:repoData[]) {

    const LanguageData:any = [];

    for(const repo of data){
        const username = repo.owner
        const repos = repo.name
        const response = await axios.get(`https://api.github.com/repos/${username}/${repos}/languages`)
        LanguageData.push({
            ...repo,
            language:response.data   
    })
        break
    }
    return LanguageData;
}   