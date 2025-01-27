const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/register', userController.registerUser);
router.get('/users', userController.getAllUsers);
// router.get('/users/email/:email', userController.getUserByEmail); // Obtener usuario por correo electrónico
router.post('/users/login', userController.loginUser);

module.exports = router;
