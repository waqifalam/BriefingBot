import MichaelWestScrapper from "./MichaelWest";
import NetraNewsScrapper from "./NetraNews";
import SBSScrapper from "./SBS"
import TheNewsDailyScrapper from "./TheNewsDaily";

const getScrapper = (scrapperId: string) => {
  switch (scrapperId) {
    case 'SBS':
      return SBSScrapper
    case 'TheNewsDaily':
      return TheNewsDailyScrapper;
    case 'MichaelWest':
      return MichaelWestScrapper
    case 'NetraNews':
      return NetraNewsScrapper
    default:
      throw new Error('Scrapper ID does not exist');
  }
}

export default getScrapper;
