const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     LibroCarrito:
 *       type: object
 *       required:
 *         - libroId
 *         - cantidad
 *       properties:
 *         libroId:
 *           type: integer
 *           description: ID del libro agregado al carrito
 *         cantidad:
 *           type: integer
 *           description: Cantidad del libro
 *       example:
 *         libroId: 3
 *         cantidad: 2
 * 
 *     ItemCarrito:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         libroId:
 *           type: integer
 *         cantidad:
 *           type: integer
 *       example:
 *         id: 1
 *         libroId: 3
 *         cantidad: 2
 */

/**
 * @swagger
 * tags:
 *   name: Carrito
 *   description: API para gestionar el carrito de compras
 */

/**
 * @swagger
 * /carrito:
 *   post:
 *     summary: Agrega un libro al carrito
 *     tags: [Carrito]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LibroCarrito'
 *     responses:
 *       201:
 *         description: Libro agregado al carrito exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemCarrito'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */

// POST /carrito
router.post('/', carritoController.agregarLibro);


/**
 * @swagger
 * /carrito:
 *   get:
 *     summary: Obtiene el contenido actual del carrito
 *     tags: [Carrito]
 *     responses:
 *       200:
 *         description: Lista de libros en el carrito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ItemCarrito'
 *       500:
 *         description: Error del servidor
 */

// GET /carrito
router.get('/', carritoController.obtenerCarrito);


/**
 * @swagger
 * /carrito/{id}:
 *   delete:
 *     summary: Elimina un libro del carrito por su ID
 *     tags: [Carrito]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del item en el carrito
 *     responses:
 *       200:
 *         description: Libro eliminado del carrito
 *       404:
 *         description: Libro no encontrado en el carrito
 *       500:
 *         description: Error del servidor
 */

// DELETE /carrito/:id
router.delete('/:id', carritoController.eliminarLibro);

module.exports = router;
