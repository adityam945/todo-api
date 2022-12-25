const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  date_time: { type: JSON, require: true },
  others:{type: JSON, default: {priority: "0"}} // priority 0 to 5
});

module.exports = mongoose.model("todos", todoSchema);