const mailgun = require("mailgun-js");

const apiKey = process.env.APIkey;
const domain = process.env.DOMAIN;

// Send an email
export async function sendEmail(to: string, subject: string, body: string) {
  const mg = mailgun({ apiKey: apiKey, domain: domain });
  const data = {
    from: "Excited User <noreply@OPD.mailgun.org>",
    to: to,
    subject: subject,
    text: body,
  };
  mg.messages().send(data, function (error: any, body: any) {
    console.log(body);
  });
}
