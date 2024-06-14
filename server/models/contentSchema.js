import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    unique: true,
  },
  owner: {
    type: String,
    required: [true, 'Owner is required'],
  },
  content_url: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: 'NEW',
  },


})

export default mongoose.model('Content', contentSchema)