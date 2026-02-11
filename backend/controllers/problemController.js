const Problem = require('../models/Problem');

// @desc    Create problem
// @route   POST /api/problems
// @access  Private
const createProblem = async (req, res) => {
  try {
    const problemData = {
      ...req.body,
      reportedBy: req.user.id
    };
    
    const problem = await Problem.create(problemData);
    
    res.status(201).json({
      success: true,
      message: 'Problem created successfully',
      problem
    });
  } catch (error) {
    console.error('Create problem error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all problems
// @route   GET /api/problems
// @access  Public
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find()
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: problems.length,
      problems
    });
  } catch (error) {
    console.error('Get problems error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single problem
// @route   GET /api/problems/:id
// @access  Public
const getProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id)
      .populate('reportedBy', 'name email')
      .populate('comments.user', 'name email');
    
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    res.json({
      success: true,
      problem
    });
  } catch (error) {
    console.error('Get problem error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update problem
// @route   PUT /api/problems/:id
// @access  Private
const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    // Check if user owns this problem
    if (problem.reportedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this problem'
      });
    }
    
    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Problem updated successfully',
      problem: updatedProblem
    });
  } catch (error) {
    console.error('Update problem error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete problem
// @route   DELETE /api/problems/:id
// @access  Private
const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    // Check if user owns this problem
    if (problem.reportedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this problem'
      });
    }
    
    await problem.deleteOne();
    
    res.json({
      success: true,
      message: 'Problem deleted successfully'
    });
  } catch (error) {
    console.error('Delete problem error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Vote on problem
// @route   POST /api/problems/:id/vote
// @access  Private
const voteProblem = async (req, res) => {
  try {
    const { type } = req.body; // 'upvote' or 'downvote'
    const problem = await Problem.findById(req.params.id);
    
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    // Remove existing vote
    problem.votes.upvotes = problem.votes.upvotes.filter(
      id => id.toString() !== req.user.id
    );
    problem.votes.downvotes = problem.votes.downvotes.filter(
      id => id.toString() !== req.user.id
    );
    
    // Add new vote
    if (type === 'upvote') {
      problem.votes.upvotes.push(req.user.id);
    } else if (type === 'downvote') {
      problem.votes.downvotes.push(req.user.id);
    }
    
    await problem.save();
    
    res.json({
      success: true,
      message: 'Vote recorded successfully',
      problem
    });
  } catch (error) {
    console.error('Vote problem error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Add comment to problem
// @route   POST /api/problems/:id/comment
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text, isAnonymous } = req.body;
    const problem = await Problem.findById(req.params.id);
    
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    const comment = {
      user: req.user.id,
      text,
      isAnonymous: isAnonymous || false
    };
    
    problem.comments.push(comment);
    await problem.save();
    
    res.json({
      success: true,
      message: 'Comment added successfully',
      problem
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update problem status
// @route   PUT /api/problems/:id/status
// @access  Private/Admin
const updateProblemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const problem = await Problem.findById(req.params.id);
    
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }
    
    problem.status = status;
    if (status === 'resolved') {
      problem.resolution = {
        description: req.body.resolution || 'Problem resolved',
        resolvedBy: req.user.id,
        resolvedAt: new Date()
      };
    }
    
    await problem.save();
    
    res.json({
      success: true,
      message: 'Problem status updated successfully',
      problem
    });
  } catch (error) {
    console.error('Update problem status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  createProblem,
  getProblems,
  getProblem,
  updateProblem,
  deleteProblem,
  voteProblem,
  addComment,
  updateProblemStatus
};
