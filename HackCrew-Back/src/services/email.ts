import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
  },
});
type sendEmailArgs = {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
};
export async function sendEmailService(args: sendEmailArgs) {
  const mailOptions = {
    from: `"HackCrew Support Team`,
    subject: args.subject,
    to: args.to,
    text: args.text,
    html: args.html,
  };
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log("Error sending email: ", error);
  }
}
