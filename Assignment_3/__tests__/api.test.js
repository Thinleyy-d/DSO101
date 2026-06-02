const request = require('supertest');
const mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

const { app, Task } = require('../server');

describe('Health Check', () => {
  test('GET / returns 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('GET / returns a message', async () => {
    const res = await request(app).get('/');
    expect(res.text).toContain('running');
  });
});

describe('Input Validation', () => {
  test('POST /api/tasks with no title returns 400', async () => {
    const res = await request(app).post('/api/tasks').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('POST /api/tasks with empty title returns 400', async () => {
    const res = await request(app).post('/api/tasks').send({ title: '   ' });
    expect(res.statusCode).toBe(400);
  });
});

describe('Task Schema', () => {
  test('Task model exists', () => {
    expect(Task).toBeDefined();
  });

  test('title is required', () => {
    expect(Task.schema.paths.title.isRequired).toBe(true);
  });

  test('completed defaults to false', () => {
    expect(Task.schema.paths.completed.defaultValue).toBe(false);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
