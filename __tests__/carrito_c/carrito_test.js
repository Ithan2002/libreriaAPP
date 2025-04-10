const request = require('supertest');
const app = require('../../app');

describe('Carrito de compras', () => {
  
  it('agrega un libro al carrito', async () => {
    // ...
  }, 10000); // 10 segundos de timeout
  
  it('obtiene el carrito con total actualizado', async () => {
    const res = await request(app).get('/carrito');
    expect(res.statusCode).toBe(200);
    expect(res.body.total).toBeGreaterThanOrEqual(0);
  });

  it('elimina un libro del carrito', async () => {
    const res = await request(app).delete('/carrito/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.mensaje).toBe('Libro eliminado del carrito');
  });
});
