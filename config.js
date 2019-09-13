const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;

const url = process.env.MONGODB_CONNECT;

mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true });
mongoose.connection.once("open", () =>
  console.log(`Connected to mongo at ${url}`)
);
