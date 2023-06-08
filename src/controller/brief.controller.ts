import generateEmail from "../lib/Email/emailTemplate";
import sendEmail from "../lib/Email/sendEmail";
import getScrapper from "../lib/Scrapper";

const BriefController = {
  sendBrief: async (scrapperId: string) => {
    if (!process.env.TO_EMAIL) {
      throw new Error('TO_EMAIL env is not set');
    }
    const scrapper = getScrapper(scrapperId);
    const brief = await scrapper.getBrief();
    const email = generateEmail(brief);
    await sendEmail(`Your ${scrapperId} Daily Brief!`, email, process.env.TO_EMAIL);
  }
}

export default BriefController;
