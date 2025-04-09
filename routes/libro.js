const express = require('express');
const router = express.Router();
const libroController = require('../controllers/librocontroller');

router.post('/', libroController.createBook);

module.exports = router;
