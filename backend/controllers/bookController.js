const Book = require('../models/Book');

// @desc    Create book
// @route   POST /api/books
// @access  Private/Senior
const createBook = async (req, res) => {
  try {
    const bookData = {
      ...req.body,
      sharedBy: req.user.id
    };
    
    const book = await Book.create(bookData);
    
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      book
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({ availability: 'available' })
      .populate('sharedBy', 'name email department year')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: books.length,
      books
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('sharedBy', 'name email department year phone')
      .populate('interestedStudents.student', 'name email department year');
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Increment view count
    book.views += 1;
    await book.save();
    
    res.json({
      success: true,
      book
    });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Check if user owns this book
    if (book.sharedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this book'
      });
    }
    
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      message: 'Book updated successfully',
      book: updatedBook
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Check if user owns this book
    if (book.sharedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this book'
      });
    }
    
    await book.deleteOne();
    
    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    console.error('Delete book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Like/Unlike book
// @route   POST /api/books/:id/like
// @access  Private
const likeBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    const isLiked = book.likes.includes(req.user.id);
    
    if (isLiked) {
      // Unlike
      book.likes = book.likes.filter(id => id.toString() !== req.user.id);
    } else {
      // Like
      book.likes.push(req.user.id);
    }
    
    await book.save();
    
    res.json({
      success: true,
      message: isLiked ? 'Book unliked' : 'Book liked',
      book
    });
  } catch (error) {
    console.error('Like book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Request book
// @route   POST /api/books/:id/request
// @access  Private
const requestBook = async (req, res) => {
  try {
    const { message, contactInfo } = req.body;
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Check if user already requested this book
    const existingRequest = book.interestedStudents.find(
      req => req.student.toString() === req.user.id
    );
    
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'You have already requested this book'
      });
    }
    
    const request = {
      student: req.user.id,
      message: message || '',
      contactInfo: contactInfo || {}
    };
    
    book.interestedStudents.push(request);
    await book.save();
    
    res.json({
      success: true,
      message: 'Book request sent successfully',
      book
    });
  } catch (error) {
    console.error('Request book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update book request
// @route   PUT /api/books/:id/request/:requestId
// @access  Private
const updateBookRequest = async (req, res) => {
  try {
    const { status } = req.body;
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Check if user owns this book
    if (book.sharedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this request'
      });
    }
    
    const request = book.interestedStudents.id(req.params.requestId);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }
    
    request.status = status;
    
    if (status === 'accepted') {
      book.availability = 'reserved';
    }
    
    await book.save();
    
    res.json({
      success: true,
      message: 'Request updated successfully',
      book
    });
  } catch (error) {
    console.error('Update book request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Mark book as sold
// @route   PUT /api/books/:id/sold
// @access  Private
const markAsSold = async (req, res) => {
  try {
    const { soldTo } = req.body;
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    
    // Check if user owns this book
    if (book.sharedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to mark this book as sold'
      });
    }
    
    book.availability = 'sold';
    book.soldTo = soldTo;
    book.soldAt = new Date();
    
    await book.save();
    
    res.json({
      success: true,
      message: 'Book marked as sold successfully',
      book
    });
  } catch (error) {
    console.error('Mark as sold error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  likeBook,
  requestBook,
  updateBookRequest,
  markAsSold
};
