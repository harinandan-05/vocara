import { getGithubAnalyze } from "./Ganalyze";
import { getGithubLanguage} from "./Glanguage";
import { getGithubProfile } from "./GProfile";
import { getGithubReadme } from "./Greadme";

export default async function GithubContextBuilder(data:string) {

    const profileData = await getGithubProfile(data);

    const filterdRepo = await getGithubAnalyze(profileData);

    const langaugeData = await getGithubLanguage(filterdRepo.topRepositories);

    const readMeData = await getGithubReadme(langaugeData);


    return readMeData;
}
