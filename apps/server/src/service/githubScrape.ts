import axios from 'axios'

interface repo {
    id:number,
    name:string,
    description:string | null,
    html_url:string,
    language:string
}
export async function githubScraping(url:string) {

    const username = url.split('/')[3];
    const apiUrl = `https://api.github.com/users/${username}/repos`
    const response = await axios.get(apiUrl)

    const data = response.data.map((repo:repo) => {
        return {
            id:repo.id,
            name:repo.name,
            description:repo.description,
            repo_url:repo.html_url,
            language:repo.language
        }
    })    
    return data;
}