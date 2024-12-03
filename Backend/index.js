const express = require("express");
var cors = require("cors");
const connection = require("./connection");

const userRoute = require("./routes/manageUsers");
const vanRoute = require("./routes/manageVans");
const companyRoute = require("./routes/manageCompanies");
const productRoute = require("./routes/manageProducts");
const displayRoute = require("./routes/manageDisplays");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoute);
app.use("/van", vanRoute);
app.use("/company", companyRoute);
app.use("/product", productRoute);
app.use("/display", displayRoute);

module.exports = app;
