const request = require('supertest');
const app = require('../../app');

describe('🧪 User Login', () => {
  it('debería iniciar sesión correctamente con credenciales válidas', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testUser',
        password: 'testPass' // La contraseña original antes de ser hasheada
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('debería fallar con credenciales inválidas', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'testUser',
        password: 'claveIncorrecta'
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Credenciales inválidas');
  });
});

