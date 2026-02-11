const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Protect all routes
router.use(protect);

// Routes
router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;
