const User = require('../models/User');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email');
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al consultar todos los usuarios');
  }
};

// Obtener usuario buscandolo a través del  correo electrónico
exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error del servidor' });
  }
};

// Crear un nuevo usuario
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { name, email, password };

  console.log('Creating user with:', newUser); // Log the raw data

  try {
    const user = await User.createUser(newUser);
    console.log('User created with hashed password:', user.password); // Log the hashed password
    res.status(201).send({ user });
  } catch (error) {
    console.error('Error creando el usuario:', error);
    res.status(500).send({ error: 'Error creando el usuario' });
  }
};

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const jwtOptions = {
  jwtFromRequest:
    require('passport-jwt').ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'movieratingapplicationsecretkey',
};

// login un usuario
// Método para iniciar sesión

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'The user does not exist!' });
    }

    console.log('Stored hashed password:', user.password); // Log the stored hashed password
    console.log('Password from request:', password); // Log the password from request body

    const isMatch = await bcryptjs.compare(password, user.password);
    console.log('Password match result:', isMatch); // Log the comparison result

    if (isMatch) {
      const payload = { id: user._id };
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      return res.json({ message: 'ok', token });
    } else {
      return res.status(401).json({ message: 'The password is incorrect!' });
    }
  } catch (error) {
    console.error('Error en user login:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Actualizar información de un usuario
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.updatedAt = new Date();

    const updatedUser = await user.save();
    res.send(updatedUser);
  } catch (error) {
    console.error('Error actualizando el usuario:', error);
    res.status(500).send({ error: 'Error actualizando el usuario' });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    res.send(user); // si está siendo paginado
  } catch (error) {
    console.error('Error eliminando el usuario:', error);
    res.status(500).send({ error: 'Error eliminando el usuario' });
  }
};
