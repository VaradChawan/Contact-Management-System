const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  contactName: { type: String, required: [true, "Name is required"] },
  contactPhoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  contactEmail: { type: String },
  userid: { type: String, required: true },
});

const contactModel = mongoose.model("contacts", contactSchema);
module.exports = contactModel;
