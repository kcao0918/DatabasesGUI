const express = require("express");
const connection = require("../connection");
const router = express.Router();

require("dotenv").config();

/**
 * HTTP Request for adding product.
 */
router.post("/addProduct", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL add_product(?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.barcode, data.name, data.weight];
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
 * HTTP Request for purchasing product.
 */
router.post("/purchaseProduct", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL purchase_product(?, ?, ?, ?, ?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.business, data.id, data.tag, data.barcode, data.quantity];
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
 * HTTP Request for deleting product.
 */
router.delete("/removeProduct", (req, res) => {
  let data = req.body;
  // Makes skeleton query.
  query =
    "CALL remove_product(?, @outputMessage); SELECT @outputMessage AS message;";
  input = [data.barcode];
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