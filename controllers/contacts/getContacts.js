const contacts = require("../../models/contacts");
const getContacts = async (req, res, next) => {
  try{
  const result = await contacts.getContacts();
  res.json(result);
} catch (err) {
  console.log(err.message);
  res.status(404).json({ message: err.message });
}
};

module.exports = { getContacts };
