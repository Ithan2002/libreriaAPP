
const { Pedido, DetallePedido, Libro } = require('../models'); // importa desde index.js

exports.getFactura = async (req, res) => {
  const { pedidoId } = req.params;

  try {
    const pedido = await Pedido.findByPk(pedidoId);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
     // 🛡 Protección OWASP API1: Validar que el pedido pertenezca al usuario autenticado
    if (pedido.usuario_id !== req.user.id) {
      return res.status(403).json({ mensaje: 'No tiene permiso para ver este pedido' });
    }
    const detalles = await DetallePedido.findAll({
      where: { pedido_id: pedidoId },
      include: {
        model: Libro,
        attributes: ['title']
      }
    });

    const detallesFormateados = detalles.map(d => {
      const subtotal = parseFloat(d.precio_unitario) * d.cantidad;
      return {
        libro: d.Libro?.title || 'Título no disponible',
        cantidad: d.cantidad,
        precio_unitario: parseFloat(d.precio_unitario),
        subtotal
      };
    });

    const total = detallesFormateados.reduce((acc, item) => acc + item.subtotal, 0);

    res.json({
      pedido_id: pedido.id,
      total,
      detalles: detallesFormateados
    });
  } catch (err) {
    console.error('Error generando factura:', err);
    res.status(500).json({ error: 'Error al obtener la factura' });
  }
};
