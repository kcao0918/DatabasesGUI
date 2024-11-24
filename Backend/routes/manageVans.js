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

module.exports = router;