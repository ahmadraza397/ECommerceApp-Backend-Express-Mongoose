const ReviewsRating = require("../model/ReviewsRating.model");

//create feedback
const giveFeedBack = (req, res) => {
  //validation;
  if (!req.body.review) {
    res.status(400).send({
      message: "Review cannot be empty",
    });
  }
  if (!req.body.rating) {
    res.status(400).send({
      message: "Rating cannot be empty",
    });
  }
  // creating FeedBack
  const feedback = new ReviewsRating({
    userId: req.body.userId,
    orderId: req.body.orderId,
    review: req.body.review,
    rating: req.body.rating,
    date: req.body.date,
  });
  // saving feedback in the database
  feedback
    .save()
    .then((feedback) => {
      console.log(feedback);
      res.status(200).send({
        status: "200",
        message: "Succeed",
        data: feedback,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while saving in Database!",
      });
    });
};

//get all feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    let filterUsers = {};
    let filterOrders = {};
    if (req.query.users) {
      filterUsers = { userId: req.query.users.split(",") };
    }
    if (req.query.orders) {
      filterOrders = { orderId: req.query.orders.split(",") };
    }
    const feedbacks = await ReviewsRating.find(
      filterUsers,
      filterOrders
    ).populate("userId orderId");
    res.json(feedbacks);
  } catch (error) {
    res.json({ message: error });
  }
};

//get feedback by single Id
const getFeedbackById = (req, res) => {
  ReviewsRating.findById(req.params.feedbackId)
    .populate("userId orderId")
    .then((feedback) => {
      if (!feedback) {
        res.status(404).send({
          message: "feedback not found with id" + req.params.feedbackId,
        });
      }
      res.send(feedback);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: "Feedback not found with id " + req.params.feedbackId,
        });
      }
      res.status(505).send({
        message: "Error getting Feedback with id " + req.params.feedbackId,
      });
    });
};

//update feedback
const updateFeedbackById = async (req, res) => {
  const feedbackBeforeUpdate = await ReviewsRating.find({
    _id: req.params.feedbackId,
  });
  //find feedback and update with req body
  ReviewsRating.findByIdAndUpdate(
    req.params.feedbackId,
    {
      userId: req.body.userId || feedbackBeforeUpdate.userId,
      orderId: req.body.orderId || feedbackBeforeUpdate.orderId,
      review: req.body.review || feedbackBeforeUpdate.review,
      rating: req.body.rating || feedbackBeforeUpdate.rating,
      date: req.body.date || feedbackBeforeUpdate.date,
    },
    { new: true }
  )
    .then((feedback) => {
      if (!feedback) {
        res.status(404).send({
          message: "feedback not found with id" + req.params.feedbackId,
        });
      }
      res.send({
        status: "200",
        message: "Updated!",
        data: feedback,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: "feedback not found with id " + req.params.feedbackId,
        });
      }
      res.status(505).send({
        message: "Error getting feedback with id " + req.params.feedbackId,
      });
    });
};

//delete feedback
const deleteFeedbackById = async (req, res) => {
  ReviewsRating.findByIdAndRemove(req.params.feedbackId)
    .then((feedback) => {
      if (!feedback) {
        return res.status(404).send({
          message: "feedback not found with id" + req.params.feedbackId,
        });
      }
      res.send({
        status: "200",
        message: "feedback Deleted!",
        data: feedback,
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: "feedback not found with id " + req.params.feedbackId,
        });
      }
      res.status(505).send({
        message: "Error getting feedback with id " + req.params.feedbackId,
      });
    });
};

module.exports = {
  giveFeedBack,
  getAllFeedbacks,
  getFeedbackById,
  updateFeedbackById,
  deleteFeedbackById,
};
