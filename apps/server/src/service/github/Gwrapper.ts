import { gAnalyze } from "./analyze";
import { Glanguage } from "./Glanguage";
import { getGithubProfile } from "./GProfile";
import { getGithubReadme } from "./Greadme";

export default async function Gwrapper(data:string) {

    const profileData = await getGithubProfile(data);

    const filterdRepo = await gAnalyze(profileData)

    const langaugeData = await Glanguage(filterdRepo.topRepositories)

    const readMeData = await getGithubReadme(langaugeData);
    console.log("final data of readme",readMeData)

    return readMeData;
}
