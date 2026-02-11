const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the problem'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the problem'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'infrastructure',
      'academic',
      'hostel',
      'canteen',
      'transportation',
      'library',
      'sports',
      'medical',
      'administration',
      'other'
    ]
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  location: {
    type: String,
    required: [true, 'Please provide the location of the problem'],
    trim: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    public_id: String
  }],
  isAnonymous: {
    type: Boolean,
    default: false
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  resolution: {
    description: String,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: Date
  },
  votes: {
    upvotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    downvotes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true,
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    isAnonymous: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }]
}, {
  timestamps: true
});

// Index for better query performance
problemSchema.index({ category: 1, status: 1 });
problemSchema.index({ location: 1 });
problemSchema.index({ priority: 1 });
problemSchema.index({ reportedBy: 1 });
problemSchema.index({ tags: 1 });

// Virtual for vote counts
problemSchema.virtual('upvoteCount').get(function() {
  return this.votes.upvotes.length;
});

problemSchema.virtual('downvoteCount').get(function() {
  return this.votes.downvotes.length;
});

problemSchema.virtual('netVotes').get(function() {
  return this.votes.upvotes.length - this.votes.downvotes.length;
});

// Ensure virtuals are included in JSON output
problemSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Problem', problemSchema);
