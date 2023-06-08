import axios from 'axios';
import parser from './DOMParser';

/**
 * Retrieve Document for an RSS url
 */
const retrieveRSSDocument = async (rssUrl: string) => {
  const response = await axios.get(rssUrl);
  const document = parser.parseFromString(response.data, "text/xml");
  return document;
};

export default retrieveRSSDocument;
