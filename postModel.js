let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
  },
  organiser: {
    type: String,
    required: true,
  },
});

let postModel = mongoose.model("postModel", postSchema);

module.exports = postModel;
