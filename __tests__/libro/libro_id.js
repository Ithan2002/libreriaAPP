const request = require('supertest');
const app = require('../../app'); // corregida la ruta

describe('🔎 Obtener libro por ID', () => {
  let libroId = 1; // Asegurate de que este ID exista. Podés ajustarlo según el ID que se cree en tus tests anteriores.

  it('debería devolver el libro con el ID especificado', async () => {
    const res = await request(app).get(`/libro/${libroId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('libro');
    expect(res.body.libro).toHaveProperty('id', libroId);
    expect(res.body.libro).toHaveProperty('title');
    expect(res.body.libro).toHaveProperty('author');
    expect(res.body.libro).toHaveProperty('category');
  });

  it('debería devolver 404 si el libro no existe', async () => {
    const res = await request(app).get('/libro/99999'); // ID que no existe

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'Libro no encontrado');
  });
});
