const express = require("express");
const router = express.Router();
const feedbackMethod = require("../controllers/ReviewsRating.controller");

//create feedback
router.post("/reviewsRating", feedbackMethod.giveFeedBack);

//get all feedbacks
router.get("/reviewsRating", feedbackMethod.getAllFeedbacks);

//get single feedBack by id
router.get("/reviewsRating/:feedbackId", feedbackMethod.getFeedbackById);

//update feedback
router.put("/reviewsRating/:feedbackId", feedbackMethod.updateFeedbackById);

//delete feedback
router.delete("/reviewsRating/:feedbackId", feedbackMethod.deleteFeedbackById);

module.exports = router;
