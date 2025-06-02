const Listing = require('../models/listing');



module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render('listings/index', { allListing });
};

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new');
};

module.exports.createListing = async (req, res, next) => {
    const url = req.file.path;
    const filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};


module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listining you requested doesn't exist!");
        res.render('/listings');
    }
    res.render('listings/edit', { listing });
};

module.exports.updateListing = async (req, res, next) => {
    const { id } = req.params;

    if (!req.body.listing) {
        throw new ExpressError(400, "Invalid Listing Data");
    }

    let listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }


    const { image, ...listingData } = req.body.listing;
    Object.assign(listing, listingData);

    if (req.file) {
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};



module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        },
    }).populate("owner");
    if (!listing) {
        req.flash("error", "Listining you requested doesn't exist!");
        res.render('/listings');
    }
    res.render('listings/show', { listing });
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listining Deleted!");
    res.redirect("/listings");
};