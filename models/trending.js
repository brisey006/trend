const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  author_image_url: {
    type: String
  },
  about_author: String,
  date: String,
  video_url: {
    type: String
  },
  news_cover: {
    type: String,
    required: true
  },
  news_images: {
    type: Array
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ],
  comments_count: Number,
  views: Number,
  tag: String,
  tile: String,
  author: {
    type: String,
    ref: 'author'
  }
});

module.exports = mongoose.model('Trending', schema);
