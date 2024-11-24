const express = require("express");
const connection = require("../connection");
const router = express.Router();

require("dotenv").config();

/**
 * HTTP Request for adding van.
 */
router.post("/addVan", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL add_van(?, ?, ?, ?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.id, data.tag, data.fuel, data.capacity, data.sales, data.driver];
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
 * HTTP Request for taking over van.
 */
router.post("/takeoverVan", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL takeover_van(?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.username, data.id, data.tag];
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
 * HTTP Request for loading van.
 */
router.post("/loadVan", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL load_van(?, ?, ?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.id, data.tag, data.barcode, data.packages, data.price];
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
 * HTTP Request for refueling van.
 */
router.post("/refuelVan", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL refuel_van(?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.id, data.tag, data.fuel];
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
 * HTTP Request for driving van.
 */
router.post("/driveVan", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL drive_van(?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.id, data.tag, data.destination];
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
 * HTTP Request for removing van.
 */
router.delete("/removeVan", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL remove_van(?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.id, data.tag];
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

module.exports = router;