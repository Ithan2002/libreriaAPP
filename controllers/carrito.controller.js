const agregarLibro = async (req, res) => {
    try {
      const { idLibro, cantidad } = req.body;
      if (!idLibro || !cantidad) {
        return res.status(400).json({ mensaje: 'Faltan datos' });
      }
      // Simulación
      res.status(200).json({ mensaje: 'Libro agregado al carrito' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error del servidor' });
    }
  };
  
  const obtenerCarrito = async (req, res) => {
    try {
      // Simulación de carrito
      const carrito = [{ id: 1, titulo: 'Libro 1', precio: 100 }];
      const total = carrito.reduce((sum, l) => sum + l.precio, 0);
      res.status(200).json({ libros: carrito, total });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error del servidor' });
    }
  };
  
  const eliminarLibro = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      // Simulación de eliminación
      res.status(200).json({ mensaje: 'Libro eliminado del carrito' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al eliminar libro' });
    }
  };
  
  module.exports = { agregarLibro, obtenerCarrito, eliminarLibro };
  