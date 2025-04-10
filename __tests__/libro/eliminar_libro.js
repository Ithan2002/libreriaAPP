const request = require('supertest');
const app = require('../../app');
const Libro = require('../../models/libro');

describe('DELETE /libro/:id', () => {
  let libroId;

  beforeEach(async () => {
    // Limpia la tabla de libros antes de cada test
    await Libro.destroy({ where: {} });

    // Crea un nuevo libro para usar su ID
    const libro = await Libro.create({
      title: 'Libro para eliminar',
      author: 'Autor de prueba',
      category: 'Novela',
      year: 2024,
    });

    libroId = libro.id;
  });

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
