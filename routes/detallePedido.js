const express = require('express');
const router = express.Router();
const detallePedidoController = require('../controllers/detallePedidoController');

/**
 * @swagger
 * components:
 *   schemas:
 *     FacturaItem:
 *       type: object
 *       properties:
 *         libroId:
 *           type: integer
 *           description: ID del libro
 *         titulo:
 *           type: string
 *           description: Título del libro
 *         cantidad:
 *           type: integer
 *           description: Cantidad comprada
 *         precioUnitario:
 *           type: number
 *           format: float
 *           description: Precio por unidad
 *         subtotal:
 *           type: number
 *           format: float
 *           description: Subtotal por ítem
 *       example:
 *         libroId: 5
 *         titulo: El imperio contraataca
 *         cantidad: 2
 *         precioUnitario: 15.99
 *         subtotal: 31.98
 * 
 *     Factura:
 *       type: object
 *       properties:
 *         pedidoId:
 *           type: integer
 *         fecha:
 *           type: string
 *           format: date-time
 *         total:
 *           type: number
 *           format: float
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FacturaItem'
 *       example:
 *         pedidoId: 10
 *         fecha: "2024-06-01T14:23:00Z"
 *         total: 89.97
 *         items:
 *           - libroId: 5
 *             titulo: El imperio contraataca
 *             cantidad: 2
 *             precioUnitario: 15.99
 *             subtotal: 31.98
 *           - libroId: 7
 *             titulo: La amenaza fantasma
 *             cantidad: 3
 *             precioUnitario: 19.33
 *             subtotal: 57.99
 */

/**
 * @swagger
 * tags:
 *   name: DetallePedido
 *   description: Operaciones relacionadas con facturación de pedidos
 */

/**
 * @swagger
 * /detallePedido/factura/{pedidoId}:
 *   get:
 *     summary: Obtiene la factura de un pedido específico
 *     tags: [DetallePedido]
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Factura detallada del pedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error del servidor
 */

router.get('/factura/:pedidoId', detallePedidoController.getFactura);

module.exports = router;
