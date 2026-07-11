const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  tags: [String],
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Snippet", snippetSchema);
