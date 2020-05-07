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
  featured: String,
  tile: String,
  category: String,
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
  author_name: String,
  author_image: String,
  author: {
    type: String,
    ref: 'author'
  }
});

module.exports = mongoose.model('Article', schema);
