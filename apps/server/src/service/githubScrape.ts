import axios from 'axios'

interface URL {
    url : string
}

export async function githubScraping(url:string) {

    try{

    const username = url.split('/')[3];
    const apiUrl = `https://api.github.com/users/${username}/repos`
    const response = await axios.get(apiUrl)

    const data = response.data.map((repo:any) => {
        return {
            id:repo.id,
            name:repo.name,
            description:repo.description,
            repo_url:repo.html_url,
            language:repo.language
        }
    })    

    return data;
    }catch(err){
        console.log(err)
    }
}