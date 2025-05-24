const request = require('supertest');
const app = require('../../app');
const { Libro } = require('../../models');

describe('POST /libro - Crear libro', () => {
  test('debería agregar un libro correctamente', async () => {
    const timestamp = Date.now(); // Para evitar duplicados

    const nuevoLibro = {
      title: `caperucita roja ${timestamp}`,
      author: 'los hermanos grimn',
      category: 'Aventura',
      stock: 6
    };

    const res = await request(app).post('/libro').send(nuevoLibro);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('libro');
    expect(res.body.libro.title).toBe(nuevoLibro.title);
    expect(res.body.libro.author).toBe(nuevoLibro.author);
    expect(res.body.libro.category).toBe(nuevoLibro.category);
    expect(res.body.libro.stock).toBe(nuevoLibro.stock);

    // Verifica en la base
    const libroEnDB = await Libro.findByPk(res.body.libro.id);
    expect(libroEnDB).not.toBeNull();
    expect(libroEnDB.title).toBe(nuevoLibro.title);
  });
});
