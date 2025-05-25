var express = require('express');
var router = express.Router();



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna una lista de usuarios (placeholder)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Respuesta simulada con un recurso
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: respond with a resource
 */
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
