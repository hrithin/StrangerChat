import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

// Transporter Setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // SMTP Server (Gmail, Outlook, etc.)
  port: 587, // 587 for TLS, 465 for SSL
  secure: false, // false for TLS, true for SSL
  auth: {
    user: process.env.EMAIL_USER, // Email address
    pass: process.env.EMAIL_PASS, // App password or email password
  },
});

/**
 * Send email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text body
 * @param {string} html - HTML body
 */

export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Stranger Chat" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Email sent successfully: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send email: ", error.message);
    throw new Error("Failed to send email. Please try again later.");
  }
};
