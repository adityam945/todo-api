const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  date_time: { type: JSON, require: true },
  others:{type: JSON, default: 
    {
      priority: 0, 
      flagged: 0,
  }}, // priority 0 to 5,
  deleted: {type: Number, default: 0}
},{
  timestamps: true
});

module.exports = mongoose.model("todos", todoSchema);



  // {
    //     "title": "adityam945@gmail.com",
    //     "description": "12345",
    //     "date_time": {
    //         "start": "",
    //         "end": ""
    //     },
    //     "others": {
    //         "priority": 0
    //     }
    // }


  //   {
  //     "title": "sample two - todos",
  //     "description": "sample two - todos description for this todo ticket",
  //     "date_time": {
  //         "start": "2022-12-26T18:30",
  //         "end": "2023-01-26T18:30"
  //     },
  //     "others": {
  //         "priority": 0,
  //         "flagged": 0
  //     }
  // }