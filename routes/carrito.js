const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

// POST /carrito
router.post('/', carritoController.agregarLibro);

// GET /carrito
router.get('/', carritoController.obtenerCarrito);

// DELETE /carrito/:id
router.delete('/:id', carritoController.eliminarLibro);

module.exports = router;
