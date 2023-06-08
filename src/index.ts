import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import BriefController from './controller/brief.controller';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/api/brief/:scrapperId', async (req: Request, res: Response) => {
  const { scrapperId } = req.params;
  if (!scrapperId) {
    res.status(404);
    return;
  }

  try {
    await BriefController.sendBrief(scrapperId);
    res.json({ status: 'Your daily brief has been sent', timestamp: new Date().toISOString() });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://host:${port}`);
});