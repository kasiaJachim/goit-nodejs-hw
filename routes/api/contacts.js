const express = require("express");
const { contacts } = require("../../controllers/index");

const { addValid, updateValid } = require("../../middlewares/validation");
const {
  createContactSchema,
} = require("../../utils/validation/contactValidationShemas");
const {
  updateContactShema,
} = require("../../utils/validation/contactValidationShemas");

const router = express.Router();

router.get("/", contacts.getContacts);

router.get("/:contactId", contacts.getContactById);

router.post("/", addValid(createContactSchema), contacts.createContact);

router.delete("/:contactId", contacts.removeContact);

router.put(
  "/:contactId",
  updateValid(updateContactShema),
  contacts.updateContact
);

module.exports = router;
