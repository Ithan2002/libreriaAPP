const request = require('supertest');
const app = require('../app'); // Ruta a tu archivo principal de Express
const sequelize = require('../config/database'); // Conexión a la base de datos
const Book = require('../models/libro'); // Modelo de la tabla 'books'
describe('POST /libro', () => {
  it('should create a new book successfully', async () => {
    const newBook = {
      title: 'El Principito',
      category: 'Ficción',
      author: 'Antoine de Saint-Exupéry'
    };

    const response = await request(app)
      .post('/libro')
      .send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id'); // Verifica que el libro tiene ID
    expect(response.body.title).toBe(newBook.title);
    expect(response.body.category).toBe(newBook.category);
    expect(response.body.author).toBe(newBook.author);
  });
});

