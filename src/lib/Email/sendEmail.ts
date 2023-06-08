import nodemailer from "nodemailer";

const getNodemailerTransporter = () => {
  const nodemailerConfig = {
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    }
  }
  return nodemailer.createTransport(nodemailerConfig);
}

const sendEmail = async (subject: string, content: string, toEmail: string) => {
  const transporter = getNodemailerTransporter();
  const message = {
    from: process.env.NODEMAILER_USER,
    to: toEmail,
    subject: subject,
    html: content
  }

  const response = await transporter.sendMail(message);
  return response;
}

export default sendEmail;
