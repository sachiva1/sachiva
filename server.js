const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const { body, validationResult } = require('express-validator');
const escapeHtml = require('escape-html');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verify SMTP connection
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP connection error:", error);
  } else {
    console.log("SMTP server is ready to send emails");
  }
});

app.post("/contact", [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required').escape(),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('message').trim().isLength({ min: 1 }).withMessage('Message is required').escape()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      success: false,
    });
  }

  try {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Collaboration Request from ${escapeHtml(name)} - Sachiva`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ff6b35; margin: 0;">Sachiva</h1>
            <h2 style="color: #333; margin: 10px 0;">New Collaboration Request</h2>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          </div>
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              This email was sent from the Sachiva contact form.<br>
              Reply directly to this email to respond to ${escapeHtml(name)}.
            </p>
          </div>
        </div>
      `,
      replyTo: email,
    };

    // Actually send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Email sent successfully!",
      success: true,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      message: "Something went wrong while sending email!",
      success: false,
      error: error.message,
    });
  }
});

// Serve index.html for root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Sachiva server is running!",
    timestamp: new Date().toISOString(),
  });
});

// serve contact.html for /contact route
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is listening to PORT: ${PORT}`);
});
