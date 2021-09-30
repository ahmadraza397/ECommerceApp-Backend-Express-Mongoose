const mongoose = require("mongoose");
const validator = require("mongoose-validator");

const reviewsRatingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    validate: { validator: Number.isInteger },
  },
  date: {
    created: { type: Date, default: Date.now },
  },
});

reviewsRatingSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

reviewsRatingSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("ReviewsRating", reviewsRatingSchema);
