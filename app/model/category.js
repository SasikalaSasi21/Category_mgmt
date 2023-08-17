const mongoose = require('mongoose');
var categorySchema = new mongoose.Schema({
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    }
});

var Category = new mongoose.model('category', categorySchema);
module.exports = Category;