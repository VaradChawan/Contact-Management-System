const express = require("express");

const router = express.Router();
const {
  addNewContact,
  deleteExistingContact,
  getAllContact,
  updateExistingContact,
} = require("../controller/contactController");

router.post("/getAllContactDetails", getAllContact);

router.post("/addNewContact", addNewContact);

router.post("/deleteContact", deleteExistingContact);

router.post("/updateContact", updateExistingContact);

module.exports = router;
