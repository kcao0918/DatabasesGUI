const express = require("express");
const connection = require("../connection");
const router = express.Router();

require("dotenv").config();

/**
 * HTTP Request for adding owner.
 */
router.post("/addOwner", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL add_owner(?, ?, ?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.username, data.fname, data.lname, data.address, data.bdate];
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
 * HTTP Request for adding employee.
 */
router.post("/addEmployee", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL add_employee(?, ?, ?, ?, ?, ?, ?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [
    data.username,
    data.fname,
    data.lname,
    data.address,
    data.bdate,
    data.taxID,
    data.hired,
    data.experience,
    data.salary,
  ];
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
 * HTTP Request for hiring employee.
 */
router.post("/hireEmployee", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL hire_employee(?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.username, data.serviceID];
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
 * HTTP Request for firing employee.
 */
router.delete("/fireEmployee", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL fire_employee(?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.username, data.serviceID];
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
 * HTTP Request for adding worker role.
 */
router.post("/addWorker", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL add_worker_role(?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.username];
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
 * HTTP Request for adding driver role.
 */
router.post("/addDriver", (req, res) => {
    let data = req.body;
    // Makes skeleton query.
    query =
      "CALL add_driver_role(?, ?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
    input = [data.username, data.licenseID, data.licenseType, data.experience];
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
 * HTTP Request for removing driver.
 */
router.delete("/removeDriver", (req, res) => {
    let data = req.body;
    // Makes skeleton query.
    query =
      "CALL fire_employee(?, @outputMessage); SELECT @outputMessage AS message;";
    input = [data.username];
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
