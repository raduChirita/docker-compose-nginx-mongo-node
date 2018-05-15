const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  number_of_files: {
    type: Number,
	min: 1,
    default: 1
  }
});

const Books = mongoose.model('books', todoSchema);

module.exports = Books;
