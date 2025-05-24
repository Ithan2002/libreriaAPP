const express = require('express');
const router = express.Router();
const libroController = require('../controllers/librocontroller');

// Crea un libro
router.post('/', libroController.createBook);

router.get('/estado/disponibles', libroController.getAvailableBooks);
router.get('/estado/agotados', libroController.getOutOfStockBooks);



// Obtiene todos los libros
router.get('/', libroController.getAllBooks);

// Obtiene un libro por ID
router.get('/:id', libroController.getBookById);

// Actualiza un libro por ID
router.put('/:id', libroController.updateBook);

// Elimina un libro por ID
router.delete('/:id', libroController.deleteBook);

module.exports = router;
