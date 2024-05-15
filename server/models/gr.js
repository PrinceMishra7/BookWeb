const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grSchema = new Schema({
 pdfId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('gr', grSchema);