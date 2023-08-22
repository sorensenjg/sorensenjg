"use server";

import nodemailer from "nodemailer";
import postmarkTransport from "nodemailer-postmark-transport";
import { newsletterSignupText, newsletterSignupHtml } from "./templates";

const options = {
  auth: {
    apiKey: process.env.POSTMARK_API_KEY,
  },
};

export async function createTransporter() {
  const transport = postmarkTransport(options);
  const transporter = nodemailer.createTransport(transport);

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    }
  });

  return transporter;
}

export async function sendEmail(formData, type) {
  let options = {
    from: "noreply@sorensenjg.com",
  };

  const email = formData.get("email");

  if (type === "newsletter-signup") {
    options.to = "hey@sorensenjg.com";
    options.subject = "Newsletter Signup";
    options.html = newsletterSignupHtml(email);
    options.text = newsletterSignupText(email);
  }

  try {
    const transporter = await createTransporter();
    const response = await transporter.sendMail(options);

    return response.accepted.length > 0;
  } catch (error) {
    return false;
  }
}
