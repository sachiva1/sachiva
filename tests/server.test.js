const request = require('supertest');
const express = require('express');
const path = require('path');

// Create a minimal app for testing
const app = express();

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Sachiva server is running!",
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

describe('Server Routes', () => {
  it('should return health status', async () => {
    const response = await request(app)
      .get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('Sachiva server is running!');
    expect(response.body.timestamp).toBeDefined();
  });

  it('should serve index.html for root route', async () => {
    const response = await request(app)
      .get('/');

    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toContain('Sachiva'); // Assuming the HTML contains 'Sachiva'
  });
});