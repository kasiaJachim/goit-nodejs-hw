const Contact = require("../../models/contact");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (result) {
      res.json({ message: "contact deleted" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { removeContact };
