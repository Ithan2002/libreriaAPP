const request = require('supertest');
const app = require('../../app');
const { Libro, Pedido, DetallePedido } = require('../../models');

describe('GET /api/detalle-pedidos/factura/:id - Factura de pedido', () => {
  let pedido;
  let libro1, libro2;

  beforeEach(async () => {
    // Usa libros existentes: toma los dos primeros que encuentre
    const libros = await Libro.findAll({ limit: 2 });

    if (libros.length < 2) {
      throw new Error('⚠️ Se necesitan al menos 2 libros existentes en la base de datos para ejecutar este test.');
    }

    libro1 = libros[0];
    libro2 = libros[1];

    // Crea un nuevo pedido temporal
    pedido = await Pedido.create({
      usuario_id: 1, // debe existir o ser dummy
      estado: 'pendiente',
      monto: 0
    });

    // Crea los detalles del pedido con esos libros
    await DetallePedido.bulkCreate([
      {
        pedido_id: pedido.id,
        libro_id: libro1.id,
        cantidad: 2,
        precio_unitario: 10.5
      },
      {
        pedido_id: pedido.id,
        libro_id: libro2.id,
        cantidad: 1,
        precio_unitario: 15.0
      }
    ]);
  });

  test('debería devolver el resumen del pedido por ID', async () => {
    const res = await request(app).get(`/api/detalle-pedidos/factura/${pedido.id}`);

    console.log('📄 Factura generada:\n', JSON.stringify(res.body, null, 2));

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('pedido_id', pedido.id);
    expect(res.body).toHaveProperty('total');
    expect(Array.isArray(res.body.detalles)).toBe(true);
    expect(res.body.detalles.length).toBe(2);
  });
});
