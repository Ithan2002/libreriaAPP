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
 *         - title
 *         - author
 *         - category
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado del libro
 *         title:
 *           type: string
 *           description: Título del libro
 *         author:
 *           type: string
 *           description: Autor del libro
 *         category:
 *           type: string
 *           description: Categoría del libro
 *         stock:
 *           type: integer
 *           description: Cantidad en inventario
 *       example:
 *         id: 1
 *         title: "El arte de la guerra"
 *         author: "Sun Tzu"
 *         category: "Estrategia"
 *         stock: 10
 */

/**
 * @swagger
 * tags:
 *   name: Libro
 *   description: API para gestionar libros
 */

/**
 * @swagger
 * /libro:
 *   post:
 *     summary: Crea un nuevo libro
 *     tags: [Libro]
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

router.post('/', libroController.createBook);

/**
 * @swagger
 * /libro/estado/disponibles:
 *   get:
 *     summary: Obtiene libros disponibles en stock
 *     tags: [Libro]
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
 * /libro/estado/agotados:
 *   get:
 *     summary: Obtiene libros agotados
 *     tags: [Libro]
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
 * /libro:
 *   get:
 *     summary: Obtiene todos los libros
 *     tags: [Libro]
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
router.get('/', libroController.getAllBooks);

/**
 * @swagger
 * /libro/{id}:
 *   get:
 *     summary: Obtiene un libro por ID
 *     tags: [Libro]
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
router.get('/:id', libroController.getBookById);

/**
 * @swagger
 * /libro/{id}:
 *   put:
 *     summary: Actualiza un libro por ID
 *     tags: [Libro]
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
router.put('/:id', libroController.updateBook);

/**
 * @swagger
 * /libro/{id}:
 *   delete:
 *     summary: Elimina un libro por ID
 *     tags: [Libro]
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
router.delete('/:id', libroController.deleteBook);

module.exports = router;
