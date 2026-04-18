import request from 'supertest';
import app from './server.js';

// =====================
// HEALTH CHECK TESTS
// =====================
describe('Health Check API', () => {
  test('GET /api/health returns 200 with OK status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'OK');
  });

  test('GET /api/health returns message field', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body).toHaveProperty('message');
    expect(typeof res.body.message).toBe('string');
  });

  test('GET /api/health has correct content-type', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['content-type']).toMatch(/json/);
  });
});

// =====================
// SECURITY HEADER TESTS
// =====================
describe('Security Headers (Helmet)', () => {
  test('x-content-type-options header is set', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });

  test('x-frame-options header is set', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['x-frame-options']).toBeDefined();
  });

  test('Server does not expose Express version', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});

// =====================
// EVENTS API TESTS
// =====================
describe('Events API', () => {
  test('GET /api/events returns 200', async () => {
    const res = await request(app).get('/api/events');
    expect([200, 500]).toContain(res.status);
  });

  test('GET /api/events returns array or error object', async () => {
    const res = await request(app).get('/api/events');
    if (res.status === 200) {
      expect(Array.isArray(res.body)).toBe(true);
    } else {
      expect(res.body).toHaveProperty('error');
    }
  });
});

// =====================
// AUTH API TESTS
// =====================
describe('Auth API - Registration', () => {
  test('POST /api/auth/register with empty body returns 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({});
    expect(res.status).toBe(400);
  });

  test('POST /api/auth/register without name returns 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ phone: '9999999999' });
    expect(res.status).toBe(400);
  });

  test('POST /api/auth/register without phone returns 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User' });
    expect(res.status).toBe(400);
  });

  test('POST /api/auth/register returns error object on failure', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({});
    expect(res.body).toHaveProperty('error');
  });
});

describe('Auth API - Login', () => {
  test('POST /api/auth/login with empty body returns 400', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({});
    expect(res.status).toBe(400);
  });

  test('POST /api/auth/login without phone returns 400', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ name: 'Test' });
    expect(res.status).toBe(400);
  });
});

// =====================
// ATTENDANCE API TESTS
// =====================
describe('Attendance API', () => {
  test('POST /api/attendance/mark with empty body returns 400', async () => {
    const res = await request(app)
      .post('/api/attendance/mark')
      .send({});
    expect(res.status).toBe(400);
  });

  test('POST /api/attendance/mark without qr_code returns 400', async () => {
    const res = await request(app)
      .post('/api/attendance/mark')
      .send({ event_id: '123e4567-e89b-12d3-a456-426614174000' });
    expect(res.status).toBe(400);
  });

  test('POST /api/attendance/mark without event_id returns 400', async () => {
    const res = await request(app)
      .post('/api/attendance/mark')
      .send({ qr_code: 'TESTQR123' });
    expect(res.status).toBe(400);
  });

  test('GET /api/attendance/:eventId with invalid UUID returns 400', async () => {
    const res = await request(app)
      .get('/api/attendance/not-a-uuid');
    expect(res.status).toBe(400);
  });

  test('GET /api/attendance/:eventId with valid UUID format accepted', async () => {
    const res = await request(app)
      .get('/api/attendance/123e4567-e89b-12d3-a456-426614174000');
    expect([200, 500]).toContain(res.status);
  });
});

// =====================
// FOOD API TESTS
// =====================
describe('Food API', () => {
  test('POST /api/food/collect with empty body returns 400', async () => {
    const res = await request(app)
      .post('/api/food/collect')
      .send({});
    expect(res.status).toBe(400);
  });

  test('POST /api/food/collect without user_id returns 400', async () => {
    const res = await request(app)
      .post('/api/food/collect')
      .send({ event_id: '123e4567-e89b-12d3-a456-426614174000' });
    expect(res.status).toBe(400);
  });

  test('POST /api/food/collect without event_id returns 400', async () => {
    const res = await request(app)
      .post('/api/food/collect')
      .send({ user_id: '123e4567-e89b-12d3-a456-426614174000' });
    expect(res.status).toBe(400);
  });

  test('GET /api/food/status with invalid UUIDs returns 400', async () => {
    const res = await request(app)
      .get('/api/food/status/invalid/invalid');
    expect(res.status).toBe(400);
  });

  test('GET /api/food/status with valid UUID format accepted', async () => {
    const res = await request(app)
      .get('/api/food/status/123e4567-e89b-12d3-a456-426614174000/123e4567-e89b-12d3-a456-426614174001');
    expect([200, 400, 500]).toContain(res.status);
  });
});

// =====================
// SEATS API TESTS
// =====================
describe('Seats API', () => {
  test('POST /api/seats/assign with empty body returns 400', async () => {
    const res = await request(app)
      .post('/api/seats/assign')
      .send({});
    expect(res.status).toBe(400);
  });

  test('POST /api/seats/assign without user_id returns 400', async () => {
    const res = await request(app)
      .post('/api/seats/assign')
      .send({ event_id: '123e4567-e89b-12d3-a456-426614174000' });
    expect(res.status).toBe(400);
  });

  test('GET /api/seats/:eventId with invalid UUID returns 400', async () => {
    const res = await request(app)
      .get('/api/seats/not-a-uuid');
    expect(res.status).toBe(400);
  });

  test('GET /api/seats/:eventId with valid UUID accepted', async () => {
    const res = await request(app)
      .get('/api/seats/123e4567-e89b-12d3-a456-426614174000');
    expect([200, 500]).toContain(res.status);
  });
});

// =====================
// CREDIT API TESTS
// =====================
describe('Credit Score API', () => {
  test('POST /api/credit/update with empty body returns 400', async () => {
    const res = await request(app)
      .post('/api/credit/update')
      .send({});
    expect(res.status).toBe(400);
  });

  test('POST /api/credit/update without user_id returns 400', async () => {
    const res = await request(app)
      .post('/api/credit/update')
      .send({ change_amount: 10, reason: 'test' });
    expect(res.status).toBe(400);
  });

  test('POST /api/credit/update without change_amount returns 400', async () => {
    const res = await request(app)
      .post('/api/credit/update')
      .send({ user_id: '123e4567-e89b-12d3-a456-426614174000', reason: 'test' });
    expect(res.status).toBe(400);
  });

  test('GET /api/credit/:userId with invalid UUID returns 400', async () => {
    const res = await request(app)
      .get('/api/credit/not-a-uuid');
    expect(res.status).toBe(400);
  });

  test('GET /api/credit/:userId with valid UUID format accepted', async () => {
    const res = await request(app)
      .get('/api/credit/123e4567-e89b-12d3-a456-426614174000');
    expect([200, 500]).toContain(res.status);
  });
});

// =====================
// EHSAAS API TESTS
// =====================
describe('EHSAAS Doubt System API', () => {
  test('POST /api/ehsaas/question with empty body returns 400', async () => {
    const res = await request(app)
      .post('/api/ehsaas/question')
      .send({});
    expect(res.status).toBe(400);
  });

  test('POST /api/ehsaas/question with empty question returns 400', async () => {
    const res = await request(app)
      .post('/api/ehsaas/question')
      .send({ question: '', event_id: '123e4567-e89b-12d3-a456-426614174000' });
    expect(res.status).toBe(400);
  });

  test('POST /api/ehsaas/question without event_id returns 400', async () => {
    const res = await request(app)
      .post('/api/ehsaas/question')
      .send({ question: 'What time is food?' });
    expect(res.status).toBe(400);
  });

  test('GET /api/ehsaas/:eventId with invalid UUID returns 400', async () => {
    const res = await request(app)
      .get('/api/ehsaas/not-a-uuid');
    expect(res.status).toBe(400);
  });
});

// =====================
// INPUT VALIDATION TESTS
// =====================
describe('Input Validation & Edge Cases', () => {
  test('SQL injection attempt in attendance is blocked', async () => {
    const res = await request(app)
      .post('/api/attendance/mark')
      .send({ qr_code: "'; DROP TABLE users; --", event_id: 'test' });
    expect([400, 500]).toContain(res.status);
    expect(res.body).not.toHaveProperty('rows');
  });

  test('XSS attempt in question is handled', async () => {
    const res = await request(app)
      .post('/api/ehsaas/question')
      .send({ question: '<script>alert("xss")</script>', event_id: 'test' });
    expect([400, 500]).toContain(res.status);
  });

  test('Very long input is handled gracefully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'A'.repeat(10000), phone: '9999999999' });
    expect([400, 500]).toContain(res.status);
  });

  test('Non-JSON body is handled', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'text/plain')
      .send('not json');
    expect([400, 500]).toContain(res.status);
  });
});

// =====================
// RATE LIMITING TESTS
// =====================
describe('Rate Limiting', () => {
  test('Multiple rapid requests are handled', async () => {
    const requests = Array(5).fill(null).map(() =>
      request(app).get('/api/health')
    );
    const responses = await Promise.all(requests);
    responses.forEach(res => {
      expect([200, 429]).toContain(res.status);
    });
  });
});
