const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a book title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  author: {
    type: String,
    required: [true, 'Please provide the author name'],
    trim: true
  },
  isbn: {
    type: String,
    trim: true,
    unique: true,
    sparse: true // Allows multiple documents with null/undefined ISBN
  },
  subject: {
    type: String,
    required: [true, 'Please provide the subject'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Please provide the department'],
    trim: true
  },
  semester: {
    type: Number,
    required: [true, 'Please provide the semester'],
    min: [1, 'Semester must be at least 1'],
    max: [8, 'Semester cannot exceed 8']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  condition: {
    type: String,
    required: [true, 'Please specify the book condition'],
    enum: ['excellent', 'good', 'fair', 'poor']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    public_id: String
  }],
  price: {
    type: Number,
    required: [true, 'Please provide the price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  sharedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  availability: {
    type: String,
    enum: ['available', 'reserved', 'sold'],
    default: 'available'
  },
  interestedStudents: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: String,
    contactInfo: {
      email: String,
      phone: String
    },
    requestedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isNegotiable: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    required: [true, 'Please provide location for exchange'],
    trim: true
  },
  preferredContactMethod: {
    type: String,
    enum: ['email', 'phone', 'both'],
    default: 'both'
  },
  notes: {
    type: String,
    maxlength: [300, 'Notes cannot exceed 300 characters']
  },
  soldTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  soldAt: Date,
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Index for better query performance
bookSchema.index({ department: 1, semester: 1 });
bookSchema.index({ subject: 1 });
bookSchema.index({ sharedBy: 1 });
bookSchema.index({ availability: 1 });
bookSchema.index({ tags: 1 });
bookSchema.index({ price: 1 });

// Virtual for discount percentage
bookSchema.virtual('discountPercentage').get(function() {
  if (this.originalPrice && this.originalPrice > 0) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Virtual for like count
bookSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Ensure virtuals are included in JSON output
bookSchema.set('toJSON', { virtuals: true });

// Middleware to validate that only seniors can share books
bookSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const User = mongoose.model('User');
      const user = await User.findById(this.sharedBy);
      
      if (!user) {
        return next(new Error('User not found'));
      }
      
      if (!user.isSenior()) {
        return next(new Error('Only senior students (year 3 and above) can share books'));
      }
      
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('Book', bookSchema);
