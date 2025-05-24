const request = require('supertest');
const app = require('../../app');
const { Libro } = require('../../models');

describe('GET /libro/:id - Obtener libro por ID', () => {
  let libroId;

  beforeAll(async () => {
    const libroExistente = await Libro.findOne();

    if (!libroExistente) {
      throw new Error('⚠️ No hay libros en la base de datos. Por favor agrega al menos uno para ejecutar este test.');
    }

    libroId = libroExistente.id;
  });

  test('debería devolver el libro con el ID especificado', async () => {
    const res = await request(app).get(`/libro/${libroId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('libro');
    expect(res.body.libro).toHaveProperty('id', libroId);
    expect(res.body.libro).toHaveProperty('title');
    expect(res.body.libro).toHaveProperty('author');
    expect(res.body.libro).toHaveProperty('category');
  });

  test('debería devolver 404 si el libro no existe', async () => {
    const res = await request(app).get('/libro/999999');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Libro no encontrado');
  });
});
