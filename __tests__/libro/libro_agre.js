const request = require('supertest');
const app = require('../../app'); // Ruta a tu archivo principal de Express

describe('🧪 Crear libro', () => {
  it('debería agregar un libro correctamente', async () => {
    const nuevoLibro = {
      title: 'movidik',
      author: 'messi',
      category: 'mágico'
    };

    const res = await request(app)
      .post('/libro')
      .send(nuevoLibro);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('libro');
    expect(res.body.libro.title).toBe(nuevoLibro.title);
    expect(res.body.libro.author).toBe(nuevoLibro.author);
    expect(res.body.libro.category).toBe(nuevoLibro.category);
  });
});



