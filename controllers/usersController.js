const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar solo por nombre de usuario
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Comparar la contraseña proporcionada con el hash almacenado
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Si todo está bien, retornar token (acá simulado)
    return res.status(200).json({ token: 'fake-jwt-token' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};


  