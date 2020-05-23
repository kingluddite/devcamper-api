const express = require('express');
const { register, login, getMe } = require('../controllers/controller-auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

// /api/v1/auth

router.post('/register', register);

router.post('/login', login);

router.get('/me', protect, getMe);

module.exports = router;
