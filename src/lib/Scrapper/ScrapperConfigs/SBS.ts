/**
 * Scrapper to get Summary from SBS Australia
 */
const SBSScrapperConfigs = {
    /**
     * RSS URL to Scrape
     */
    RSS_URL: 'https://www.sbs.com.au/feed/news/content-collection-rss/top-stories',
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
    LINK_URL_CONTENT_TAG: 'span',
    /**
     * Filtering function if RSS feed requires filtering
     * If not provide null
     */
    RSS_ITEM_FILTER: null,
}
  
export default SBSScrapperConfigs;
  