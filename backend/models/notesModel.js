const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    description: {
      type: "string",
      required: true,
    },
    refrence: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
