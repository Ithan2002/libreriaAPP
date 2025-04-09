const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      return res.status(200).json({ token: 'fake-jwt-token' });
    }

    return res.status(401).json({ message: 'Credenciales inválidas' });
  } catch (error) {
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

  