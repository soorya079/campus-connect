const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the lost item'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the lost item']
  },
  image: {
    url: {
      type: String,
      required: [true, 'Please provide an image URL for the lost item']
    },
    public_id: String
  },
  location: {
    type: String,
    required: [true, 'Please provide the location where the item was lost'],
    trim: true
  },
  dateLost: {
    type: Date,
    required: [true, 'Please provide the date when the item was lost']
  },
  finderContact: {
    name: String,
    email: String,
    phone: String
  },
  status: {
    type: String,
    enum: ['lost', 'found', 'claimed'],
    default: 'lost'
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LostItem', lostItemSchema);
