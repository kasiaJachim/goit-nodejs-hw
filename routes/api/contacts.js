const express = require("express");
const { contacts } = require("../../controllers");

const {
  addValid,
  updateValid,
  updateFavorite,
} = require("../../middlewares/validation");
const {
  createContactSchema,
  updateStatusContactSchema,
  updateContactSchema,
} = require("../../utils/validation/contactValidationShemas");
const authenticate = require('../../middlewares/authenticate');

const router = express.Router();

router.get("/",authenticate, contacts.listContacts);

router.get("/:contactId",authenticate, contacts.getContactById);

router.post("/",authenticate, addValid(createContactSchema), contacts.addContact);

router.delete("/:contactId",authenticate, contacts.removeContact);

router.put(
  "/:contactId",
  authenticate,
  updateValid(updateContactSchema),
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  updateFavorite(updateStatusContactSchema),
  contacts.updateStatusContact
);

module.exports = router;
