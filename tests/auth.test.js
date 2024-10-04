const request = require('supertest');
const app = require('../src/app'); // Ensure you export your app from app.js
const sequelize = require('../src/services/db');
const User = require('../src/models/User');

beforeAll(async () => {
  await sequelize.sync({ force: false }); // Reset database before tests
});

describe('Authentication', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/register')
      .send({ username: 'testuser', password: 'testpass' });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login the user', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'testuser', password: 'testpass' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not login with wrong credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'wronguser', password: 'wrongpass' });
    
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});
