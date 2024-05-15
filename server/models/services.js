const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImageSchema = new Schema({
    url: String,
    filename: String,
})
ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200')
})

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
    description: {
        type: String,
        required: true
    },
    serviceNo: {
        type: Number,
       
    },
    images: ImageSchema
});

module.exports = mongoose.model('service', serviceSchema);