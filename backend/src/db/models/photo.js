const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    prompt: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

// Create Contacts collection
const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
