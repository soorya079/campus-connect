const express = require('express');
const { protect, optionalAuth, authorize } = require('../middleware/auth');
const { 
  createProblem, 
  getProblems, 
  getProblem, 
  updateProblem, 
  deleteProblem,
  voteProblem,
  addComment,
  updateProblemStatus
} = require('../controllers/problemController');

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getProblems);
router.get('/:id', optionalAuth, getProblem);

// Protected routes
router.use(protect);
router.post('/', createProblem);
router.put('/:id', updateProblem);
router.delete('/:id', deleteProblem);
router.post('/:id/vote', voteProblem);
router.post('/:id/comment', addComment);

// Admin routes
router.put('/:id/status', authorize('admin', 'staff'), updateProblemStatus);

module.exports = router;
