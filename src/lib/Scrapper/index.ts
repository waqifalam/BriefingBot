import axios from "axios";
import notEmpty from "../../utils/notEmpty";
import retrieveRSSDocument from "../retrieveRSSDocument";
import parser from "../DOMParser";
import getSummary from "../Summarizer";
import delay from "../../utils/delay";

// Scrapper Configs
import ABCScrapperConfigs from "./ScrapperConfigs/ABC";
import MichaelWestScrapperConfigs from "./ScrapperConfigs/MichaelWest";
import SBSScrapperConfigs from "./ScrapperConfigs/SBS";
import TheNewsDailyScrapperConfigs from "./ScrapperConfigs/TheNewsDaily";
import NetraNewsScrapperConfigs from "./ScrapperConfigs/NetraNews";

/**
 * Scrapper to get Summary from ABC Australia
 */
class Scrapper {
  /**
   * Get document for the RSS feed
   * @returns document: Promise<Document>
   */
  static async getRSSDocument(RSS_URL: string) {
    return await retrieveRSSDocument(RSS_URL)
  }

  /**
   * Get all the RSS Item links
   * @param document Document for the RSS Feed
   * @returns List of RSS item URLs
   */
  static getRSSItemLinks(document: Document, RSS_SELECTOR_ITEM_TAGNAME: string, RSS_ITEM_LINK_INDEX: number, RSS_ITEM_FILTER: ((value: Element) => boolean) | null) {
    const items = document.documentElement.getElementsByTagName(RSS_SELECTOR_ITEM_TAGNAME);
    const links = Array.from(items);
    const filteredLinks = RSS_ITEM_FILTER ? links.filter(RSS_ITEM_FILTER) : links;
    const linksTextContent = filteredLinks.map((item) => item.children[RSS_ITEM_LINK_INDEX].textContent)
    return linksTextContent.filter(notEmpty)
  }

  /**
   * Visit all RSS links and get HTML content
   * @param links Links to visit
   * @returns list of content in the links
   */
  static async getRSSLinksContent(links: string[], LINK_URL_CONTENT_TAG: string) {
    const promises = links.map((link) => axios.get<string>(link))
    const response = await Promise.all(promises);
    return response.map((result) => {
      const data = result.data
      const parsedDoc = parser.parseFromString(data, "text/html");
      const textDoc = parsedDoc.documentElement.getElementsByTagName(LINK_URL_CONTENT_TAG);
      return Array.from(textDoc).reduce((acc, tDoc) => `${acc} ${tDoc.textContent}`, '')
    })
  }

  /**
   * Get list of summary for the contentList
   * @param contentList List of content from the RSS Feed
   * @returns list of summary
   */
  static async getSummaryForRSSLinksContent(contentList: string[]) {
    return Promise.all(contentList.map(async (document) => {
      const summary = await getSummary(document)
      /**
       * Add delay to debounce to ensure we do not get rate limited
       */
      await delay(5000);
      return summary;
    }));
  }

  static getScrapperConfigs(scrapperId: string) {
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

  /**
   * Get News Brief
   * @returns List of summary for RSS feed links
   */
  static async getBrief(scrapperId: string) {
    const scrapperConfigs = Scrapper.getScrapperConfigs(scrapperId)
    const RSSDocument = await Scrapper.getRSSDocument(scrapperConfigs.RSS_URL);
    const rssLinks = Scrapper.getRSSItemLinks(
      RSSDocument,
      scrapperConfigs.RSS_SELECTOR_ITEM_TAGNAME,
      scrapperConfigs.RSS_ITEM_LINK_INDEX,
      scrapperConfigs.RSS_ITEM_FILTER,
    );
    const linksContentList = await Scrapper.getRSSLinksContent(rssLinks, scrapperConfigs.LINK_URL_CONTENT_TAG);
    return await Scrapper.getSummaryForRSSLinksContent(linksContentList);
  }
}

export default Scrapper;
