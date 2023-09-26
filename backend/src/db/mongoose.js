const mongoose = require("mongoose");
const mongodbURL = process.env.MONGODB_URL;

//Connect MongoDB
mongoose.connect(mongodbURL).then(() => {
  console.error("Connected to Database");
}).catch(error =>
  console.error(error, "Error connecting to Database")
);
