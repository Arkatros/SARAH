import nodemailer from "nodemailer";
import { getMidwifeWelcomeSubject, getMidwifeWelcomeText } from "../templates/mailBienvenidaSimple.js";

const baseurl = "http://127.0.0.1:3000/api/users/active/";

async function encodeMailToLink(email) {
  return await Buffer.from(email, "utf8").toString("base64url");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_APP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendMail(data) {
    const encodedlink = await encodeMailToLink(data.email);
    console.log(data.temporalpassword);
    const activationLink = `${baseurl}${encodedlink}`;
    console.log(encodedlink);
    
    const subject = getMidwifeWelcomeSubject();
    const text = getMidwifeWelcomeText(data.name, data.temporalPass, activationLink);
    
    const mailOptions = {
        from: process.env.GOOGLE_MAIL,
        to: data.email,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}

export async function genericSendMail(toEmail, subject, body) {
  const mailOptions = {
      from: process.env.GOOGLE_MAIL,
      to: toEmail,
      subject: subject,
      html: body, 
  };
  try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      return info;
  } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
  }
}








