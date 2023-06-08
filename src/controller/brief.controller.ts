import generateEmail from "../lib/Email/emailTemplate";
import sendEmail from "../lib/Email/sendEmail";
import Scrapper from "../lib/Scrapper";

const BriefController = {
  sendBrief: async (scrapperId: string) => {
    if (!process.env.TO_EMAIL) {
      throw new Error('TO_EMAIL env is not set');
    }
    const brief = await Scrapper.getBrief(scrapperId);
    const email = generateEmail(brief);
    await sendEmail(`Your ${scrapperId} Daily Brief!`, email, process.env.TO_EMAIL);
  }
}

export default BriefController;
