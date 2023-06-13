const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  dsc: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
  },

  categories: {
    type: Array,
    required: true,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Post", postSchema);
