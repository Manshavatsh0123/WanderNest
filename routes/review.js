const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Reviews-post routes
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Reviews-Delete Route
router.delete("/:reviewsId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destoryReview));

module.exports = router;