import SBSScrapper from "./SBS"

const getScrapper = (scrapperId: string) => {
  switch (scrapperId) {
    case 'SBS':
      return SBSScrapper
    default:
      throw new Error('Scrapper ID does not exist');
  }
}

export default getScrapper;
