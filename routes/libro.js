const express = require('express');
const router = express.Router();
const libroController = require('../controllers/librocontroller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Libro:
 *       type: object
 *       required:
 *         - titulo
 *         - autor
 *         - stock
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del libro
 *         titulo:
 *           type: string
 *           description: Título del libro
 *         autor:
 *           type: string
 *           description: Autor del libro
 *         stock:
 *           type: integer
 *           description: Cantidad en inventario
 *       example:
 *         id: 1
 *         titulo: "El arte de la guerra"
 *         autor: "Sun Tzu"
 *         stock: 10
 */

/**
 * @swagger
 * tags:
 *   name: Libros
 *   description: API para gestionar libros
 */

/**
 * @swagger
 * /libros:
 *   post:
 *     summary: Crea un nuevo libro
 *     tags: [Libros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Libro'
 *     responses:
 *       201:
 *         description: Libro creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 *       400:
 *         description: Datos inválidos
 */

// Crea un libro
router.post('/', libroController.createBook);

/**
 * @swagger
 * /libros/estado/disponibles:
 *   get:
 *     summary: Obtiene libros disponibles en stock
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Lista de libros disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Libro'
 */

router.get('/estado/disponibles', libroController.getAvailableBooks);
/**
 * @swagger
 * /libros/estado/agotados:
 *   get:
 *     summary: Obtiene libros agotados
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Lista de libros agotados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Libro'
 */
router.get('/estado/agotados', libroController.getOutOfStockBooks);
/**
 * @swagger
 * /libros:
 *   get:
 *     summary: Obtiene todos los libros
 *     tags: [Libros]
 *     responses:
 *       200:
 *         description: Lista de todos los libros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Libro'
 */


// Obtiene todos los libros
router.get('/', libroController.getAllBooks);

/**
 * @swagger
 * /libros/{id}:
 *   get:
 *     summary: Obtiene un libro por ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del libro
 *     responses:
 *       200:
 *         description: Libro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 *       404:
 *         description: Libro no encontrado
 */

// Obtiene un libro por ID
router.get('/:id', libroController.getBookById);
/**
 * @swagger
 * /libros/{id}:
 *   put:
 *     summary: Actualiza un libro por ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del libro a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Libro'
 *     responses:
 *       200:
 *         description: Libro actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Libro'
 *       404:
 *         description: Libro no encontrado
 */

// Actualiza un libro por ID
router.put('/:id', libroController.updateBook);
/**
 * @swagger
 * /libros/{id}:
 *   delete:
 *     summary: Elimina un libro por ID
 *     tags: [Libros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del libro a eliminar
 *     responses:
 *       200:
 *         description: Libro eliminado
 *       404:
 *         description: Libro no encontrado
 */

// Elimina un libro por ID
router.delete('/:id', libroController.deleteBook);

module.exports = router;
