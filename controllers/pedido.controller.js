const Pedido = require('../models/pedido');
const DetallePedido = require('../models/detallePedido');
const Libro = require('../models/libro');

exports.realizarPedido = async (req, res) => {
  try {
    const { libros, direccion } = req.body;

    if (!libros || !Array.isArray(libros) || libros.length === 0) {
      return res.status(400).json({ error: 'El pedido debe incluir al menos un libro' });
    }

    if (!direccion) {
      return res.status(400).json({ error: 'La dirección de entrega es obligatoria' });
    }

    // Validar que los libros existan (opcional)
    const idsLibros = libros.map(libro => libro.id);
    const librosValidos = await Libro.findAll({ where: { id: idsLibros } });

    if (librosValidos.length !== libros.length) {
      return res.status(400).json({ error: 'Uno o más libros no existen en la base de datos' });
    }

    // Calcular monto total simulado
    const precioFijo = 100;
    const monto = libros.length * precioFijo;

    // Crear pedido
    const pedido = await Pedido.create({
      usuario_id: 1, // reemplaza con req.user.id si tenés auth
      estado: 'pendiente',
      monto
    });

    // Crear detalles de pedido
    for (const libro of libros) {
      await DetallePedido.create({
        pedido_id: pedido.id,
        libro_id: libro.id,
        cantidad: 1,
        precio_unitario: precioFijo
      });
    }

    res.status(201).json({
      mensaje: 'Pedido realizado con éxito',
      pedido: {
        id: pedido.id,
        direccion,
        libros: librosValidos.map(l => ({ id: l.id, title: l.title }))
      }
    });
  } catch (error) {
    console.error('Error al registrar pedido:', error);
    res.status(500).json({ error: 'Error al registrar el pedido' });
  }
};
