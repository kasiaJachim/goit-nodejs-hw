const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    console.log(contacts);
    const result = contacts.find((item) => item.id === contactId);
    if (!result) {
      throw new Error("Not found");
    }
    return result;
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    console.log(index);
    if (index === -1) {
      throw new Error("Not found");
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();

    contacts.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return body;
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);

    if (index === -1) {
      throw new Error("Not found");
    }

    const updatedContact = { ...contacts[index], ...body };
    contacts[index] = updatedContact;
    console.log(body);
    console.log(updatedContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return updatedContact;
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: err.message });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
