// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API LIBRERIA_APP',
      version: '1.0.0',
      description: 'Documentación de la API de LIBRERIA_APP',
      contact: {
        name: 'grupo C'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./routes/*.js'] // Aquí Swagger escaneará tus rutas para las anotaciones
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
