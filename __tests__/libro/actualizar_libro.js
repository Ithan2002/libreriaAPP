const request = require('supertest');
const app = require('../../app'); // Ajustá si tu archivo app.js está en otra ruta

describe('✏️ Actualizar libro', () => {
  let libroId;

  beforeAll(async () => {
    // Crear un libro primero para poder actualizarlo
    const res = await request(app).post('/libro').send({
      title: 'Libro original',
      author: 'Autor original',
      category: 'Categoría original'
    });
    libroId = res.body.libro.id;
  });

  it('debería actualizar el título de un libro existente', async () => {
    const res = await request(app)
      .put(`/libro/${libroId}`)
      .send({ title: 'Libro actualizado' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Libro actualizado');
    expect(res.body.libro).toHaveProperty('title', 'Libro actualizado');
  });
});
