const express = require("express");
var cors = require("cors");
const connection = require("./connection");

const userRoute = require("./routes/manageUsers");
const vanRoute = require("./routes/manageVans");
const companyRoute = require("./routes/manageCompanies");
const productRoute = require("./routes/manageProducts");
const displayRoute = require("./routes/manageDisplays");

const app = express();
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);

const IN_PROD = process.env.NODE_ENV === "production";
const MAX_AGE = 1000 * 60 * 60 * 24 * 365;
const options = {
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  createDatabaseTable: true,
};

const sessionStore = new mysqlStore(options);

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    name: "Login-Sessions",
    store: sessionStore,
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: IN_PROD,
      maxAge: MAX_AGE,
      sameSite: true,
    },
  })
);

app.use("/user", userRoute);
app.use("/van", vanRoute);
app.use("/company", companyRoute);
app.use("/product", productRoute);
app.use("/display", displayRoute);

module.exports = app;
