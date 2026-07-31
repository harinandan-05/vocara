interface datas {
    id:number,
    name:string,
    description:string | null,
    html_url:string,
    language:string | null,
    fork:boolean,
    stars:number,
    visibility: string,
    size:number,
    topics:string[],
    pushed_at:string,
    created_at:string
}

export async function gAnalyze(repositories:datas[]) {
    const candidateRepo:datas[] = [];
    const nonCandidateRepo:datas[] = [];


    // filtering logic here

    for(const repo of repositories){

        if(repo.fork){
            nonCandidateRepo.push(repo)
            continue;
        }
        if(repo.size < 100){
            nonCandidateRepo.push(repo)
            continue;
        }

        candidateRepo.push(repo);
    }

    // ranking logic iam writing here
    const rankedRepo = [];
    
    for(const repo of candidateRepo){

        let score  = 0;
        const reason = []
        if(repo.description){
            score += 3;
            reason.push("has description")
        }

        if(repo.size > 300 && repo.size < 1000){
            score += 2;
            reason.push("Has size of upto 1000kb")
        }

        if(repo.size > 1000){
            score += 3;
            reason.push("Has more than 1000kb")
        }

        if(repo.stars < 3){
            score += 1;
            reason.push("Star count < 3")
        }

        if(repo.stars > 10){
            score += 3;
            reason.push("Has more than 10 stars")
        } 

        if(repo.topics.length > 0){
            score += 3;
            reason.push("Has topics which are inside teh repo")
        }

        rankedRepo.push({
            ...repo,
            reason,
            score
        })
    }
    const finalRepositories:datas[] = rankedRepo.sort((a , b) => b.score - a.score)

    const topRepositories =  finalRepositories.slice(0,10);

    return {
        topRepositories,
        rankedRepo,
        nonCandidateRepo,
        candidateRepo
    }
}