
import { ReactComponent as CreativeIcon } from '../assets/questionnaire/1-creative.svg';
import { ReactComponent as BusinessIcon } from '../assets/questionnaire/1-business.svg';
import { ReactComponent as MarketerIcon } from '../assets/questionnaire/1-marketer.svg';
import { ReactComponent as SearchIcon } from '../assets/questionnaire/2-search.svg';
import { ReactComponent as SocialIcon } from '../assets/questionnaire/2-social.svg';
import { ReactComponent as InfluencerIcon } from '../assets/questionnaire/2-influencer.svg';
import { ReactComponent as MyBusinessIcon } from '../assets/questionnaire/3-business.svg';
import { ReactComponent as ClientIcon } from '../assets/questionnaire/3-client.svg';
import { ReactComponent as CuriousIcon } from '../assets/questionnaire/3-curious.svg';


const iconComponents = {
    CreativeIcon,
    BusinessIcon,
    MarketerIcon,
    SearchIcon,
    SocialIcon,
    InfluencerIcon,
    MyBusinessIcon,
    ClientIcon,
    CuriousIcon
};

export const getIconComponentByName = (iconName) => iconComponents[iconName] || null;