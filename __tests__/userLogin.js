const request = require('supertest');
const app = require('../app'); // Ruta a tu archivo principal de Express

describe('User Login', () => {
  it('should login successfully with valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testUser', password: 'testPass' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
