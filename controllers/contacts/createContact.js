const contacts = require("../../models/contacts");
const { nanoid } = require("nanoid");

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const contact = await contacts.addContact(newContact);
    if (contact) {
      res.status(201).json(contact);
    }
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

module.exports = { createContact };
