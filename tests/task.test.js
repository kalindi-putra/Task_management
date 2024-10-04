const request = require('supertest');
const app = require('../src/app'); // Ensure you export your app from app.js
const sequelize = require('../src/services/db');
const User = require('../src/models/User');
const Task = require('../src/models/Task');

let token;
let userId;

beforeAll(async () => {
  await sequelize.sync({ force: false }); 

  // Create a user
  await request(app)
    .post('/api/register')
    .send({ username: 'testuser', password: 'testpass' });

  // Login to get a token
  const loginResponse = await request(app)
    .post('/api/login')
    .send({ username: 'testuser', password: 'testpass' });

  token = loginResponse.body.token;
});

describe('Task Management', () => {
  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New Task', description: 'Task description', status: 'Todo', priority: 'High', dueDate: new Date() });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'New Task');
  });

  it('should get tasks', async () => {
    const response = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should update a task', async () => {
    const task = await Task.create({ title: 'Update Task', description: 'Task description', status: 'Todo', priority: 'High', dueDate: new Date(), userId });

    const response = await request(app)
      .put(`/api/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Task' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Task');
  });

  it('should delete a task', async () => {
    const task = await Task.create({ title: 'Delete Task', description: 'Task description', status: 'Todo', priority: 'High', dueDate: new Date(), userId });

    const response = await request(app)
      .delete(`/api/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Task deleted');
  });
});
