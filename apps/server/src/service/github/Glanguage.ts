import axios from "axios";
import pLimit from "p-limit";

interface repoData {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  fork: boolean;
  stars: number;
  visibility: string;
  size: number;
  topics: string;
  pushed_at: string;
  created_at: string;
  owner: string;
}

const limit = pLimit(3);

export async function getGithubLanguage(data: repoData[]) {

  const tasks = data.map((repo) => 
    limit(async() => {
        const username = repo.owner
        const repoName = repo.name
        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/languages`)
        return {
            ...repo,
            languages:response.data
        }
    })
)


  const results = await Promise.allSettled(tasks)

  const settledResults = results.filter(r => r.status === "fulfilled").map(r => r.value)
 
  return settledResults;
}

