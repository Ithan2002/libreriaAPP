const request = require('supertest');
const app = require('../../app');
const { Libro } = require('../../models');

describe('GET /libro/estado/disponibles y /libro/estado/agotados', () => {
  test('debería obtener solo los libros disponibles', async () => {
    const res = await request(app).get('/libro/estado/disponibles');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    // Verifica que todos los libros tengan stock > 0
    res.body.forEach(libro => {
      expect(libro).toHaveProperty('stock');
      expect(libro.stock).toBeGreaterThan(0);
    });
  });

  test('debería obtener solo los libros agotados', async () => {
    const res = await request(app).get('/libro/estado/agotados');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    // Verifica que todos los libros tengan stock = 0
    res.body.forEach(libro => {
      expect(libro).toHaveProperty('stock');
      expect(libro.stock).toBe(0);
    });
  });
});
