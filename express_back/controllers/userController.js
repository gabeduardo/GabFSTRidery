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

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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
  const newUser = new User({ name, email, password });

  try {
    const user = await User.createUser(newUser);
    res.status(201).send({ user });
  } catch (error) {
    console.error('Error creando el usuario:', error);
    res.status(500).send({ error: 'Error creando el usuario' });
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
