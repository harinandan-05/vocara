import { gAnalyze } from "./analyze";
import { Glanguage } from "./Glanguage";
import { getGithubProfile } from "./GProfile";

export default async function Gwrapper(data:string) {

    const profileData = await getGithubProfile(data);

    const filterdRepo = await gAnalyze(profileData)

    const langaugeData = await Glanguage(filterdRepo.topRepositories)
    console.log("final data" , langaugeData)
    return langaugeData;
}
