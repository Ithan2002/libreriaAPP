const request = require('supertest');
const app = require('../../app');
const { Libro } = require('../../models');

describe('PUT /libro/:id - Actualizar un libro', () => {
  let libroId;

  beforeAll(async () => {
    // Buscar un libro ya existente
    const libroExistente = await Libro.findOne();

    if (!libroExistente) {
      throw new Error('⚠️ No hay libros en la base de datos. Agrega al menos uno para ejecutar este test.');
    }

    libroId = libroExistente.id;
  });

  test('debería actualizar el título de un libro existente', async () => {
    const nuevoTitulo = `Libro actualizado ${Date.now()}`;

    const res = await request(app)
      .put(`/libro/${libroId}`)
      .send({ title: nuevoTitulo });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Libro actualizado');
    expect(res.body.libro).toHaveProperty('title', nuevoTitulo);

    const libroEnDB = await Libro.findByPk(libroId);
    expect(libroEnDB.title).toBe(nuevoTitulo);
  });

  test('debería devolver 404 si el libro no existe', async () => {
    const idInexistente = 999999;
    const res = await request(app)
      .put(`/libro/${idInexistente}`)
      .send({ title: 'No existe' });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Libro no encontrado');
  });
});
