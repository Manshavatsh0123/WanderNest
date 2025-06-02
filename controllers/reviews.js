const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReviews = new Review(req.body.review);
    newReviews.author = req.user._id;

    listing.reviews.push(newReviews);

    await newReviews.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destoryReview = async (req, res) => {
    let { id, reviewsId } = req.params;
    Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } });
    await Review.findByIdAndDelete(reviewsId);
    req.flash("success", "Review Deleted!")
    res.redirect(`/listings/${id}`);
};