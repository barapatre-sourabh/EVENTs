import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import dotenv from "dotenv";
import messageRouter from "./router/messageRouter.js";
import cors from "cors";
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';

const app = express();

dotenv.config({ path:"./config/config.js" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/message", messageRouter);

app.post('/api/v1/message', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a transporter object using your email service
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // use environment variables for security
    },
  });

  const mailOptions = {
    from: email, // sender's email
    to:process.env.EMAIL_USER , // replace with your email
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error); // Log the error details
    res.status(500).json({ message: 'Failed to send email.', error: error.message });
  }
});

dbConnection();

export default app;
