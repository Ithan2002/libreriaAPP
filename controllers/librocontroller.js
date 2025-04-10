const Book = require('../models/libro');

// ✅ Crear un nuevo libro
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({ libro: newBook }); // Respuesta esperada en test
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Obtener todos los libros
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ libros: books }); // Devolvemos un objeto con la lista en "libros"
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Obtener un libro por ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(200).json({ libro: book }); // Respuesta como objeto
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Actualizar un libro
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    await book.update(req.body);
    res.status(200).json({ message: 'Libro actualizado', libro: book });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Eliminar un libro
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Libro no encontrado' });
    }

    await book.destroy();
    res.status(200).json({ message: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

