import Mustache from 'mustache';
import fs from 'fs';

/**
 * Returns an email HTML with populating email template content
 * @param contentList List of summarised content
 * @returns email html
 */
const generateEmail = (contentList: string[]) => {
  const emailTemplate = fs.readFileSync('./src/lib/Email/template.html', { encoding: 'utf8', flag: 'r' });
  const contentListHTML = contentList.reduce((acc, content) => `${acc}<li><p>${content}</p></li>`, '')
  return Mustache.render(emailTemplate, { contentListHTML });
}

export default generateEmail;
