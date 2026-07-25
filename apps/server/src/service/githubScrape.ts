import axios from 'axios'

interface URL {
    url : string
}

async function githubScraping(url:string) {
    const data = await axios.get(url)
}