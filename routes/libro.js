const express = require('express');
const router = express.Router();
const libroController = require('../controllers/librocontroller');
//crea un libro
router.post('/', libroController.createBook);
//obtiene todos los libros
router.get('/', libroController.getAllBooks);
//obtiene un libro por ID
router.get('/:id', libroController.getBookById);
//actualiza un libro
router.put('/:id', libroController.updateBook);
//elimina un libro
router.delete('/:id', libroController.deleteBook);



module.exports = router;
