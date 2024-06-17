const nodemailer = require("nodemailer");

require("dotenv").config();
const mailSender = async (email, title, body) => {
  try {
    console.log(email ,title ,body);
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,

      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: "StudyNotion ", // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      text: `${body}`, // plain text body
      html: `<h1>${body}  </h1>` , // html body
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = mailSender;
