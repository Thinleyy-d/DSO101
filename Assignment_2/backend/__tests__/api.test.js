const request = require('supertest');
const mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

const { app, Task } = require('../server');

// ===== TEST 1: Health Check =====
describe('Health Check', () => {

  test('GET / returns 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('GET / response contains text', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBeTruthy();
  });

});

// ===== TEST 2: Input Validation =====
describe('Input Validation', () => {

  test('POST /api/tasks with no body returns 400', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({});
    expect(res.statusCode).toBe(400);
  });

  test('POST /api/tasks with no body returns error message', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({});
    expect(res.body).toHaveProperty('error');
  });

  test('POST /api/tasks with empty title returns 400', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '' });
    expect(res.statusCode).toBe(400);
  });

});

// ===== TEST 3: Schema Tests (No DB needed) =====
describe('Task Schema Tests', () => {

  test('Task model is defined', () => {
    expect(Task).toBeDefined();
  });

  test('Task schema has title path', () => {
    expect(Task.schema.paths.title).toBeDefined();
  });

  test('Task schema has completed path', () => {
    expect(Task.schema.paths.completed).toBeDefined();
  });

  test('Task title is required', () => {
    expect(Task.schema.paths.title.isRequired).toBe(true);
  });

  test('Task completed default is false', () => {
    expect(Task.schema.paths.completed.defaultValue).toBe(false);
  });

  test('Task schema has timestamps', () => {
    expect(Task.schema.paths.createdAt).toBeDefined();
  });

});

// ===== Cleanup =====
afterAll(async () => {
  await mongoose.connection.close();
});