/**
 * Scrapper to get Summary from NetraNews
 */
const NetraNewsScrapperConfigs = {
  /**
   * RSS URL to Scrape
   */
  RSS_URL: 'https://netra.news/rss/',
  /**
   * RSS News Selector Tag
   */
  RSS_SELECTOR_ITEM_TAGNAME: 'item',
  /**
   * Index in Item where the link of the news resides
   */
  RSS_ITEM_LINK_INDEX: 2,
  /**
   * TAGNAME to scrape from Link URL
   */
  LINK_URL_CONTENT_TAG: 'p',
  /**
   * Filtering function if RSS feed requires filtering
   */
  RSS_ITEM_FILTER: (item: Element) => {
    /**
     * Netra News has both Bangla and English news
     * Uses special characters in the title making it hard to detect English news
     */
    const regex = /^[0-9A-Za-z \\[\]\\<\\>\\!\\@\\$\\%\\*\\&\\(\\)\\?.,\\:\\;\\'\\"\\{\\}\\+\\=\\-\\_\\”\\“\\’\\-]+$/
    return item.children[0].textContent?.match(regex) !== null
  },
}
  
export default NetraNewsScrapperConfigs;
  