const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/register', userController.registerUser);
router.get('/users', userController.getAllUsers);

module.exports = router;
