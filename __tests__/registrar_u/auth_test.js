const request = require('supertest');
const app = require('../../app');

describe('🧪 Registro e inicio de sesión', () => {
  const userData = {
    username: 'daiana',
    password: '1234567',
    email: 'daiana@test.com'
  };

  test('Registro exitoso', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('registro exitoso');
  });

  test('Inicio de sesión exitoso', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: userData.username, password: userData.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('login exitoso');
    expect(res.body.token).toBeDefined();
  });
});
