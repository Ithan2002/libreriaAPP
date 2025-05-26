const request = require('supertest');
const app = require('../../app');

describe('🧪 Registro e inicio de sesión', () => {
  const userData = {
    username: 'usertestX3',
    password: '1234567',
    email: 'usertestX3@test.com'
  };

  test('Registro exitoso', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Registro exitoso');

  });

  test('Inicio de sesión exitoso', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: userData.username, password: userData.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Login exitoso'); // ✅ coincide con tu controlador
    expect(res.body.token).toBeDefined();
  });
});
