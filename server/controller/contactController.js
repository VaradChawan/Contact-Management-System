const contactModel = require("../models/contactModel");

const addNewContact = async (req, res) => {
  try {
    
    const addContact = new contactModel(req.body);
    await addContact.save();
    res.status(200).send("Contact added successfully");
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateExistingContact = async (req, res) => {
  try {
    await contactModel.findByIdAndUpdate(
      { _id: req.body.contactId },
      req.body.payload
    );
    res.status(200).send("Contact updated successfully");
  } catch (err) {
    res.status(400).send("Fail to update the contact");
  }
};

const deleteExistingContact = async (req, res) => {
  try {
    await contactModel.findByIdAndDelete({ _id: req.body.contactId });
    res.status(200).send("Contact has been deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllContact = async (req, res) => {
  
  const { userid } = req.body;
  
  try {
    const contact = await contactModel.find({ userid: userid });
    
    res.status(200).json(contact);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  addNewContact,
  updateExistingContact,
  deleteExistingContact,
  getAllContact,
};
