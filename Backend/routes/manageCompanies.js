const express = require("express");
const connection = require("../connection");
const router = express.Router();

require("dotenv").config();

/**
 * HTTP Request for adding business.
 */
router.post("/addBusiness", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL add_business(?, ?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.name, data.rating, data.spent, data.location];
  connection.query(query, input, (err, results) => {
    if (!err) {
      const outputMessage = results[1][0].message;
      return res.status(200).json({
        message: outputMessage,
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for funding business.
 */
router.post("/fundBusiness", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL start_funding(?, ?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.username, data.amount, data.name, data.date];
  connection.query(query, input, (err, results) => {
    if (!err) {
      const outputMessage = results[1][0].message;
      return res.status(200).json({
        message: outputMessage,
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for adding service.
 */
router.post("/addService", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL add_service(?, ?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.id, data.name, data.location, data.manager];
  connection.query(query, input, (err, results) => {
    if (!err) {
      const outputMessage = results[1][0].message;
      return res.status(200).json({
        message: outputMessage,
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for managing service.
 */
router.post("/manageService", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL manage_service(?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.username, data.id];
  connection.query(query, input, (err, results) => {
    if (!err) {
      const outputMessage = results[1][0].message;
      return res.status(200).json({
        message: outputMessage,
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for adding location.
 */
router.post("/addLocation", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL add_location(?, ?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.name, data.xCord, data.yCord, data.space];
  connection.query(query, input, (err, results) => {
    if (!err) {
      const outputMessage = results[1][0].message;
      return res.status(200).json({
        message: outputMessage,
      });
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting service ids.
 */
router.get("/services", (req, res) => {
  query = "SELECT id FROM delivery_services";
  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting businesses.
 */
router.get("/businesses", (req, res) => {
  query = "SELECT long_name FROM businesses";
  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

/**
 * HTTP Request for getting locations.
 */
router.get("/locations", (req, res) => {
  query = "SELECT label FROM locations";
  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
