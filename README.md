# BriefingBot
![briefing-bot-logo](https://github.com/waqifalam/BriefingBot/assets/41558152/e781e305-fb68-47c3-8756-6efdedef9a12)

## Overview
BriefingBot is an intelligent tool designed to simplify your news consumption. It automatically extracts and summarizes the latest news articles from various websites, then sends a concise and engaging email with the key highlights directly to your inbox. Stay informed without spending hours browsing multiple news sources—let BriefingBot deliver the news you need in a convenient and time-saving manner.

## Features
- **Automated Summarization**: BriefingBot utilizes advanced natural language processing techniques (facebook/bart-large-cnn model) to summarize news articles accurately and extract the most relevant information.
- **Customizable News Sources**: Tailor your news preferences by selecting your preferred sources from a wide range of trusted news websites.

## Installation
1. Clone the BriefingBot repository to your local machine:
```
git clone https://github.com/waqifalam/BriefingBot
```

2. Navigate to the project directory:
```
cd BriefingBot
```

3. Install the required dependencies using `npm`:
```
npm install
```

4. Configure the email settings by creating a .env file at the root of the project. Sample `.env` as follows
```
PORT=<PORT_TO_RUN_ON>
HUGGING_FACE_API_KEY=<YOUR_HUGGING_FACE_API_KEY>
NODEMAILER_SERVICE=<MAILER_SERVICE>
NODEMAILER_USER=<APP_TO_SEND_EMAIL_FROM>
NODEMAILER_PASSWORD=<APP_PASS>
TO_EMAIL=<WHERE_TO_SEND_EMAIL_TO>
```

5. Start the BriefingBot API:
```
npm run start:dev
```

6. The API should now be running on your specified port. You can interact with the API endpoints using tools like cURL or Postman. 

## Usage
### API Endpoints
- GET /api/brief/:scrapperId: Retrieves the latest news summaries based on the scrapperId news source and sends an email summary. List of all the `scrapperIds` are present in the `/src/lib/Scrapper/ScrapperConfigs/index.ts` file.

## Contributing
Contributions to BriefingBot are more than welcome! To contribute, follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name for your feature or fix. Please ensure a relevant GitHub issue is present for your feature or bugfix.
```
git checkout -b feature/your-feature-name
```

3. Implement your changes and ensure they adhere to the project's coding style.

4. Commit your changes:
```
git commit -m "Add your commit message here"
```

5. Push your branch to your forked repository:
```
git push origin feature/your-feature-name
```

6. Open a pull request on the original repository, providing a clear description of your changes.

### Adding a new Source
- Please refer to `src/lib/Scrapper/ReadME.md` for contribution guide on adding news sources.

## License
This project is licensed under the MIT License.

## Contact
For any questions, suggestions, or feedback, please reach out to our team in the issues section. We value your input and are here to assist you with any inquiries or support you may need.

Let's make staying informed a breeze with BriefingBot!
