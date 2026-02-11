const express = require('express');
const { protect, optionalAuth } = require('../middleware/auth');
const { 
  createLostItem, 
  getLostItems, 
  getLostItem, 
  updateLostItem, 
  deleteLostItem,
  claimLostItem 
} = require('../controllers/lostItemController');

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getLostItems);
router.get('/:id', optionalAuth, getLostItem);

// Protected routes
router.use(protect);
router.post('/', createLostItem);
router.put('/:id', updateLostItem);
router.delete('/:id', deleteLostItem);
router.post('/:id/claim', claimLostItem);

module.exports = router;
