const request = require('supertest');
const app = require('../../app');
const { Libro } = require('../../models');

describe('DELETE /libro/:id - Eliminar un libro específico', () => {
  const libroId = 263; // 🔧 Cambiá este valor por el ID del libro que querés eliminar

  test('debería eliminar un libro existente y responder con 200', async () => {
    const res = await request(app).delete(`/libro/${libroId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Libro eliminado correctamente');

    const libroEnDB = await Libro.findByPk(libroId);
    expect(libroEnDB).toBeNull();
  });

  test('debería devolver 404 si el libro no existe', async () => {
    const idInexistente = 999999;
    const res = await request(app).delete(`/libro/${idInexistente}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Libro no encontrado');
  });
});
