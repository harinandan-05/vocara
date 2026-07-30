import axios from "axios";

interface repos {
    id:number,
    name:string,
    description:string | null,
    html_url:string,
    language:string
}
export async function getGithubProfile(url:string) {

    const username = url.split('/')[3];
    const response = await axios.get(`https://api.github.com/users/${username}/repo`)
    const Userdata = response.data.map((repo:repos) => {
        return {
            id:repo.id,
            name:repo.name,
            description:repo.description,
            repo_url:repo.html_url,
            language:repo.language
        }
    })
    return Userdata;
}