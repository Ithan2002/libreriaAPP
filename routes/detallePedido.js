const express = require('express');
const router = express.Router();
const detallePedidoController = require('../controllers/detallePedidoController');

router.get('/factura/:pedidoId', detallePedidoController.getFactura);

module.exports = router;
