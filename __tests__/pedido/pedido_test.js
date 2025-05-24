const request = require('supertest');
const app = require('../../app');
const { Libro } = require('../../models');

describe('📦 Simulación de Pedido', () => {
  let libro1, libro2;

  beforeAll(async () => {
    // Buscar dos libros existentes en la base de datos
    const libros = await Libro.findAll({ limit: 2 });

    if (libros.length < 2) {
      throw new Error('⚠️ Se requieren al menos 2 libros existentes en la base de datos para este test.');
    }

    libro1 = libros[0];
    libro2 = libros[1];
  });

  it('debería registrar un pedido válido', async () => {
    const res = await request(app).post('/pedido').send({
      libros: [
        { id: libro1.id },
        { id: libro2.id }
      ],
      direccion: 'Calle Falsa 123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('mensaje', 'Pedido realizado con éxito');
    expect(res.body.pedido).toHaveProperty('id');
    expect(res.body.pedido).toHaveProperty('direccion', 'Calle Falsa 123');
    expect(res.body.pedido.libros.length).toBe(2);
    expect(res.body.pedido.libros[0]).toHaveProperty('id');
    expect(res.body.pedido.libros[0]).toHaveProperty('title');
  });

  it('debería fallar si no se envían libros', async () => {
    const res = await request(app).post('/pedido').send({
      libros: [],
      direccion: 'Calle Falsa 123'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('El pedido debe incluir al menos un libro');
  });

  it('debería fallar si no hay dirección', async () => {
    const res = await request(app).post('/pedido').send({
      libros: [{ id: libro1.id }]
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('La dirección de entrega es obligatoria');
  });
});
