const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listing.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(ListingController.index))
    .post(
    isLoggedIn,
    upload.single("listing[image]"),
    (req, res, next) => {
        if (req.file) {
            req.body.listing.image = {
                url: req.file.path,
                filename: req.file.filename
            };
        }
        next();
    },
    validateListing,
    wrapAsync(ListingController.createListing)
)


//New Route
router.get("/new", isLoggedIn, ListingController.renderNewForm);

router
    .route("/:id")
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        (req, res, next) => {
            if (req.file) {
                req.body.listing.image = {
                    url: req.file.path,
                    filename: req.file.filename,
                };
            }
            next();
        },
        validateListing,
        wrapAsync(ListingController.updateListing)
    )

    .get(wrapAsync(ListingController.showListing))
    .delete(isLoggedIn, isOwner, wrapAsync(ListingController.deleteListing));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.editListing));

module.exports = router;