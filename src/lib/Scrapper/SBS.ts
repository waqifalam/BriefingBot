import axios from "axios";
import notEmpty from "../../utils/notEmpty";
import retrieveRSSDocument from "../retrieveRSSDocument"
import parser from "../DOMParser";
import getSummary from "../Summarizer";
import delay from "../../utils/delay";

/**
 * Scrapper to get Summary from SBS Australia
 */
class SBSScrapper {
  /**
   * RSS URL to Scrape
   */
  static RSS_URL = 'https://www.sbs.com.au/feed/news/content-collection-rss/top-stories'

  /**
   * Get document for the RSS feed
   * @returns document: Promise<Document>
   */
  static async getRSSDocument() {
    return await retrieveRSSDocument(SBSScrapper.RSS_URL)
  }

  /**
   * Get all the RSS Item links
   * @param document Document for the RSS Feed
   * @returns List of RSS item URLs
   */
  static getRSSItemLinks(document: Document) {
    const items = document.documentElement.getElementsByTagName('item');
    const links = Array.from(items).map((item) => item.children[2].textContent)
    return links.filter(notEmpty)
  }

  /**
   * Visit all RSS links and get HTML content
   * @param links Links to visit
   * @returns list of content in the links
   */
  static async getRSSLinksContent(links: string[]) {
    const promises = links.map((link) => axios.get<string>(link))
    const response = await Promise.all(promises);
    return response.map((result) => {
      const data = result.data
      const parsedDoc = parser.parseFromString(data, "text/html");
      const textDoc = parsedDoc.documentElement.getElementsByTagName('span');
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

  /**
   * Get News Brief
   * @returns List of summary for RSS feed links
   */
  static async getBrief() {
    const RSSDocument = await SBSScrapper.getRSSDocument();
    const rssLinks = SBSScrapper.getRSSItemLinks(RSSDocument);
    const linksContentList = await SBSScrapper.getRSSLinksContent(rssLinks);
    return await SBSScrapper.getSummaryForRSSLinksContent(linksContentList);
  }
}

export default SBSScrapper;
