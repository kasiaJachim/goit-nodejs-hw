const nodemailer = require("nodemailer");

require("dotenv").config();

const nodemailerConfig = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: process.env.EMAIL_USER };
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = sendEmail;
