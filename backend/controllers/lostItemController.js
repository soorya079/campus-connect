const LostItem = require('../models/LostItem');

// @desc    Create lost item
// @route   POST /api/lost-items
// @access  Private
const createLostItem = async (req, res) => {
  try {
    const { title, description, image, location, dateLost } = req.body;
    
    const lostItem = await LostItem.create({
      title,
      description,
      image,
      location,
      dateLost,
      reportedBy: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Lost item created successfully',
      lostItem
    });
  } catch (error) {
    console.error('Create lost item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all lost items
// @route   GET /api/lost-items
// @access  Public
const getLostItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find()
      .populate('reportedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: lostItems.length,
      lostItems
    });
  } catch (error) {
    console.error('Get lost items error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single lost item
// @route   GET /api/lost-items/:id
// @access  Public
const getLostItem = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id)
      .populate('reportedBy', 'name email phone');
    
    if (!lostItem) {
      return res.status(404).json({
        success: false,
        message: 'Lost item not found'
      });
    }
    
    res.json({
      success: true,
      lostItem
    });
  } catch (error) {
    console.error('Get lost item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update lost item
// @route   PUT /api/lost-items/:id
// @access  Private
const updateLostItem = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);
    
    if (!lostItem) {
      return res.status(404).json({
        success: false,
        message: 'Lost item not found'
      });
    }
    
    // Check if user owns this item
    if (lostItem.reportedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this item'
      });
    }
    
    const updatedItem = await LostItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Lost item updated successfully',
      lostItem: updatedItem
    });
  } catch (error) {
    console.error('Update lost item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete lost item
// @route   DELETE /api/lost-items/:id
// @access  Private
const deleteLostItem = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);
    
    if (!lostItem) {
      return res.status(404).json({
        success: false,
        message: 'Lost item not found'
      });
    }
    
    // Check if user owns this item
    if (lostItem.reportedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this item'
      });
    }
    
    await lostItem.deleteOne();
    
    res.json({
      success: true,
      message: 'Lost item deleted successfully'
    });
  } catch (error) {
    console.error('Delete lost item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Claim lost item
// @route   POST /api/lost-items/:id/claim
// @access  Private
const claimLostItem = async (req, res) => {
  try {
    const lostItem = await LostItem.findById(req.params.id);
    
    if (!lostItem) {
      return res.status(404).json({
        success: false,
        message: 'Lost item not found'
      });
    }
    
    lostItem.status = 'claimed';
    await lostItem.save();
    
    res.json({
      success: true,
      message: 'Lost item claimed successfully',
      lostItem
    });
  } catch (error) {
    console.error('Claim lost item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  createLostItem,
  getLostItems,
  getLostItem,
  updateLostItem,
  deleteLostItem,
  claimLostItem
};
