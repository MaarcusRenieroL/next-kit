// @ts-nocheck
import { ReactElement } from "react";
import { Resend } from "resend";
import { EmailTemplate } from "../components/email-template";

type Props = {
  fromEmail: string;
  toEmail: string;
  subject: string;
};

export const sendEmail = async ({ fromEmail, toEmail, subject }: Props) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  return await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject: subject,
    react: EmailTemplate(""),
  });
};
