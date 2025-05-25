const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedido.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pedido:
 *       type: object
 *       required:
 *         - direccion
 *         - libros
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del pedido
 *         direccion:
 *           type: string
 *           description: Dirección de entrega
 *         libros:
 *           type: array
 *           description: Lista de libros incluidos en el pedido
 *           items:
 *             type: object
 *             properties:
 *               libroId:
 *                 type: integer
 *                 description: ID del libro
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad solicitada
 *       example:
 *         id: 1
 *         direccion: "Calle 123, Ciudad"
 *         libros:
 *           - libroId: 5
 *             cantidad: 2
 *           - libroId: 8
 *             cantidad: 1
 */

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: API para gestionar pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Realiza un nuevo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pedido'
 *     responses:
 *       201:
 *         description: Pedido realizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       400:
 *         description: Datos del pedido inválidos
 *       500:
 *         description: Error en el servidor
 */

router.post('/', pedidoController.realizarPedido);

module.exports = router;
