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

const router = express.Router();

router.get("/", contacts.listContacts);

router.get("/:contactId", contacts.getContactById);

router.post("/", addValid(createContactSchema), contacts.addContact);

router.delete("/:contactId", contacts.removeContact);

router.put(
  "/:contactId",
  updateValid(updateContactSchema),
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  updateFavorite(updateStatusContactSchema),
  contacts.updateStatusContact
);

module.exports = router;
