/**
 * Scrapper to get Summary from SBS Australia
 */
const TheNewsDailyScrapperConfigs = {
    /**
     * RSS URL to Scrape
     */
    RSS_URL: 'https://thenewdaily.com.au/finance/feed/',
    /**
     * RSS News Selector Tag
     */
    RSS_SELECTOR_ITEM_TAGNAME: 'item',
    /**
     * Index in Item where the link of the news resides
     */
    RSS_ITEM_LINK_INDEX: 1,
    /**
     * TAGNAME to scrape from Link URL
     */
    LINK_URL_CONTENT_TAG: 'p',
    /**
     * Filtering function if RSS feed requires filtering
     * If not provide null
     */
    RSS_ITEM_FILTER: null,
}
  
export default TheNewsDailyScrapperConfigs;
