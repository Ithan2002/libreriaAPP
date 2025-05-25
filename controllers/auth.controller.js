const User = require('../models/User'); // Ajusta la ruta si es necesario
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtConfig = {
  secret: 'secreto123',
  expiresIn: '1h'
};

// Registro de usuario
exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  // Validar campos requeridos
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios: username, email, password' });
  }

  try {
    const existe = await User.findOne({ where: { username } });
    if (existe) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Asegurarse de que la contraseña sea una cadena válida
    const hash = await bcrypt.hash(String(password), 10);

    await User.create({ username, email, password: hash });

    return res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validar campos requeridos
  if (!username || !password) {
    return res.status(400).json({ message: 'Se requieren username y password' });
  }

  try {
    const usuario = await User.findOne({ where: { username } });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const valido = await bcrypt.compare(String(password), usuario.password);
    if (!valido) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: usuario.id, username: usuario.username }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    return res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
