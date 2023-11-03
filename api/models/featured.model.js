const mongoose = require("mongoose");
const featuredSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userImage: {
      type: String,
    },
    expertise: {
      type: String,
    },
  },
  { timestamps: true }
);

const Featured = mongoose.model("Featured", featuredSchema);
module.exports = Featured;
