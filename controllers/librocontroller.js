const Book = require('../models/libro');
const { Op } = require('sequelize');

// ✅ Crear un nuevo libro
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({ libro: newBook });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Obtener todos los libros
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ libros: books });
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
    res.status(200).json({ libro: book });
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
    res.status(200).json({ message: 'Libro eliminado correctamente' }); // 🔧 Mensaje corregido
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableBooks = async (req, res) => {
  const libros = await Book.findAll({ where: { stock: { [Op.gt]: 0 } } });
  res.status(200).json(libros);
};

exports.getOutOfStockBooks = async (req, res) => {
  const libros = await Book.findAll({ where: { stock: 0 } });
  res.status(200).json(libros);
};
