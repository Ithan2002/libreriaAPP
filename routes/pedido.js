const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');

router.post('/', pedidoController.realizarPedido);

module.exports = router;
