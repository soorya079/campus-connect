const express = require('express');
const { protect, optionalAuth, isSenior } = require('../middleware/auth');
const { 
  createBook, 
  getBooks, 
  getBook, 
  updateBook, 
  deleteBook,
  likeBook,
  requestBook,
  updateBookRequest,
  markAsSold
} = require('../controllers/bookController');

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getBooks);
router.get('/:id', optionalAuth, getBook);

// Protected routes
router.use(protect);
router.post('/', isSenior, createBook); // Only seniors can create books
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.post('/:id/like', likeBook);
router.post('/:id/request', requestBook);
router.put('/:id/request/:requestId', updateBookRequest);
router.put('/:id/sold', markAsSold);

module.exports = router;
