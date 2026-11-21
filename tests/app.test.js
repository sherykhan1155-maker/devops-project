const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
  test('GET /health returns status 200 and { status: "ok" }', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET / returns welcome string', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('DevOps Internship Project Running!');
  });
});
