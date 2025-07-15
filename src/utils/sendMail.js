import nodemailer from 'nodemailer';
import { SMTP } from "../constants/index.js";
import { getEnvVar } from "./getEnvVar.js";

const transporter = nodemailer.createTransport({
  host: getEnvVar(SMTP.SMTP_HOST),
  port: Number(getEnvVar(SMTP.SMTP_PORT)),
  secure: Number(getEnvVar(SMTP.SMTP_PORT)) === 465,
  auth: {
    user: getEnvVar(SMTP.SMTP_USER),
    pass: getEnvVar(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  try {
    console.log('📤 Sending email to:', options.to); // ← корисний лог
    const result = await transporter.sendMail(options);
    console.log('✅ Email sent:', result.response); // ← підтвердження
    return result;
  } catch (error) {
    console.error('🔴 Send email error:', error);
    throw new Error('Email sending failed');
  }
};
