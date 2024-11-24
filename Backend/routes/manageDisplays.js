const express = require("express");
const connection = require("../connection");
const router = express.Router();

require("dotenv").config();

/**
 * HTTP Request for getting owner view.
 */
router.get("/ownerView", (req, res) => {
  query = "SELECT * FROM display_owner_view";
  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting employee view.
 */
router.get("/employeeView", (req, res) => {
  query = "SELECT * FROM display_employee_view";
  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting driver view.
 */
router.get("/driverView", (req, res) => {
  query = "SELECT * FROM display_driver_view";
  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting location view.
 */
router.get("/locationView", (req, res) => {
  query = "SELECT * FROM display_location_view";
  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting product view.
 */
router.get("/productView", (req, res) => {
  query = "SELECT * FROM display_product_view";
  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting service view.
 */
router.get("/serviceView", (req, res) => {
  query = "SELECT * FROM display_service_view";
  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;