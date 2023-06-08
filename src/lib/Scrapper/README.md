# Adding New News Sources to BriefingBot
Thank you for your interest in contributing to BriefingBot! Adding new news sources to the tool allows us to expand its capabilities and provide summaries from a wider range of trusted sources. To help you understand how the news source code works and how you can contribute, follow the instructions below.

## Step 1: Configuring the News Source Scraper
To scrape news from a new source, we need to create a configuration that specifies how to fetch and extract the relevant information in the `ScrapperConfigs` folder. Below is an example of the configuration structure for the ABC Australia news source:

Example below:
```
/**
 * Scrapper to get Summary from ABC Australia
 */
const ABCScrapperConfigs = {
  /**
   * RSS URL to Scrape
   */
  RSS_URL: 'https://www.abc.net.au/news/feed/2942460/rss.xml',
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
   * If not provided, set to null
   */
  RSS_ITEM_FILTER: null,
}

export default ABCScrapperConfigs;
```

In this configuration, you need to specify the following details:

- `RSS_URL`: The URL of the RSS feed for the news source.
- `RSS_SELECTOR_ITEM_TAGNAME`: The HTML tag that represents each news item in the RSS feed.
- `RSS_ITEM_LINK_INDEX`: The index of the array where the link to the news article resides within each news item.
- `LINK_URL_CONTENT_TAG`: The HTML tag that contains the content to be extracted from the news article link.
- `RSS_ITEM_FILTER` (optional): If the RSS feed requires filtering, you can provide a filtering function. Otherwise, set it to `null`.

## Step 2: Integrating the News Source Configurations
To integrate the new news source configuration into BriefingBot, follow these steps:

1. Import the new configuration file (`ABCScrapperConfigs` in the example above) into `index.ts` inside `ScrapperConfigs` that contains the `getScrapperConfigs` function.

2. Add a new case in the switch statement within the `getScrapperConfigs` function, using the unique identifier for the news source as the `scrapperId`:

```
import ABCScrapperConfigs from "./ABC";
// Import other news source configurations here...

const getScrapperConfigs = (scrapperId: string) => {
  switch (scrapperId) {
    case 'ABC':
      return ABCScrapperConfigs;
    // Add a new case for the new news source here...
    default:
      throw new Error('Invalid News Source')
  }
}

export default getScrapperConfigs;
```

## Step 3: Contributing the New News Source
Once you have added the configuration for the new news source, you can contribute it back to the BriefingBot project. Follow these steps:

1. Open a new issue on the project GitHub.
2. Fork the BriefingBot repository on GitHub.
3. Create a new branch for your feature or fix:
```
git checkout -b feature/add-new-news-source
```
4. Add the new news source configuration file to the appropriate directory.
5. Update the `getScrapperConfigs` function as described in Step 2.
6. Commit your changes and push the branch to your forked repository.
7. Open a pull request on the original BriefingBot repository, providing a clear description of the changes and the new news source you have added.

We appreciate your contribution, and our team will review your pull request as soon as possible. Feel free to reach out if you have any questions or need further assistance.

Happy contributing!
