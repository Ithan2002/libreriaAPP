const request = require('supertest');
const app = require('../../app');

describe('📚 Lista de libros', () => {
  it('debería devolver un array con todos los libros', async () => {
    const res = await request(app).get('/libro');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.libros)).toBe(true);

    // Si hay libros en la base, verificamos las propiedades
    if (res.body.libros.length > 0) {
      const libro = res.body.libros[0];
      expect(libro).toHaveProperty('id');
      expect(libro).toHaveProperty('title');
      expect(libro).toHaveProperty('author');
      expect(libro).toHaveProperty('category');
    }
  });
});



