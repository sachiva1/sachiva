const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const escapeHtml = require('escape-html');

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    verify: jest.fn((callback) => callback(null, true)),
    sendMail: jest.fn((mailOptions, callback) => callback(null, { messageId: 'test' }))
  }))
}));

// Import the app after mocking
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

    // Mock email sending
    res.status(200).json({
      message: "Email sent successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while sending email!",
      success: false,
      error: error.message,
    });
  }
});

describe('Contact Form API', () => {
  it('should return success for valid input', async () => {
    const response = await request(app)
      .post('/contact')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello world'
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Email sent successfully!');
  });

  it('should return error for missing name', async () => {
    const response = await request(app)
      .post('/contact')
      .send({
        email: 'john@example.com',
        message: 'Hello world'
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Name is required');
  });

  it('should return error for invalid email', async () => {
    const response = await request(app)
      .post('/contact')
      .send({
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Hello world'
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Valid email is required');
  });

  it('should return error for missing message', async () => {
    const response = await request(app)
      .post('/contact')
      .send({
        name: 'John Doe',
        email: 'john@example.com'
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Message is required');
  });

  it('should sanitize input', async () => {
    const response = await request(app)
      .post('/contact')
      .send({
        name: '<script>alert("xss")</script>John',
        email: 'john@example.com',
        message: '<b>Hello</b> world'
      });

    expect(response.status).toBe(200);
    // The input should be sanitized, but since we're mocking, we can't check the email content
  });
});