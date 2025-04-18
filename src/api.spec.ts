import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import app from './server';

describe('API endpoints', () => {
  let email: string;
  let username: string;
  const password = 'password123';

  beforeAll(() => {
    const timestamp = Date.now();
    email = `testuser_${timestamp}@example.com`;
    username = `TestUser_${timestamp}`;
  });

  it('GET /api/users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  });

  it('POST /api/register - успешная регистрация', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        username,
        email,
        password
      });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message');
  });

  it('POST /api/register - ошибка при коротком пароле', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'ShortPassUser',
        email: `shortpass_${Date.now()}@example.com`,
        password: '123'
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /api/register - ошибка при повторной регистрации', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        username, // тот же username
        email,    // тот же email
        password
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /api/login - успешный логин', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email,
        password
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('POST /api/login - ошибка при неверном пароле', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email,
        password: 'wrongpassword'
      });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /api/login - ошибка при несуществующем email', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'notfound_' + Date.now() + '@example.com',
        password
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /api/profile - с валидным токеном', async () => {
    const loginRes = await request(app)
      .post('/api/login')
      .send({ email, password });
    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
  });

  it('GET /api/profile - без токена', async () => {
    const res = await request(app).get('/api/profile');
    expect(res.status).toBe(401);
  });

  it('GET /api/profile - с невалидным токеном', async () => {
    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.status).toBe(401);
  });

  it('GET /api/posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  });

  it('GET /api/comments', async () => {
    const res = await request(app).get('/api/comments');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  });

  it('GET /api/messages', async () => {
    const res = await request(app).get('/api/messages');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
  });
});
