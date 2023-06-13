const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
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

module.exports = mongoose.model("category", categorySchema);
