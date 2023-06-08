import ABCScrapperConfigs from "./ABC";
import MichaelWestScrapperConfigs from "./MichaelWest";
import NetraNewsScrapperConfigs from "./NetraNews";
import SBSScrapperConfigs from "./SBS";
import TheNewsDailyScrapperConfigs from "./TheNewsDaily";

const getScrapperConfigs = (scrapperId: string) => {
  switch (scrapperId) {
    case 'ABC':
      return ABCScrapperConfigs;
    case 'MichaelWest':
      return MichaelWestScrapperConfigs;
    case 'SBS':
      return SBSScrapperConfigs;
    case 'TheNewsDaily':
      return TheNewsDailyScrapperConfigs;
    case 'NetraNews':
      return NetraNewsScrapperConfigs;
    default:
      throw new Error('Invalid News Source')
  }
}

export default getScrapperConfigs;
