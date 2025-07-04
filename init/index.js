const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

let MONGO_URL = "mongodb://127.0.0.1:27017/WanderNest";
main().then(() => {
  console.log("Connected to DB");
}).catch(err => {
  console.log(err);
});

async function main() {
  await mongoose.connect(MONGO_URL);
}

//change owner id
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({...obj, owner:"6810c27040b0be5a4e80222a"}))
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

initDB(); 