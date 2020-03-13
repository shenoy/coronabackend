const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  Country: {
    type: String,
    required: [true, 'A case must have a Country']
  },
  County: {
    type: String,
    required: [true, 'A case must have a County']
  },
  City: {
    type: String,
    required: [true, 'A case must have a City']
  },
  Origin: {
    type: String,
    required: [true, 'A case must have a Origin']
  },
  Date: {
    type: Date,
    required: [true, 'A case must have a date reported']
  },
  Confirmed: {
    type: Number,
    required: [true, 'A case must have a confirmed number']
  },

  Serious: {
    type: Number,
    required: [true, 'A case must have a serious number']
  },
  Dead: {
    type: Number,
    required: [true, 'A case must have a number of dead']
  },
  Recovered: {
    type: Number,
    required: [true, 'A case must have a number of recovered']
  },
  Website: {
    type: String,
    required: [true, 'A case must have a website']
  },
  Summary: {
    type: String,
    trim: true
  },
  Image: {
    type: String,
    required: [true, 'A case must have an image']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false
  },
  Location: [
    {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number
    }
  ]
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
