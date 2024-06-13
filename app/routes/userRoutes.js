const express = require("express");
const { verifyUser, verifyAdmin } = require("../utils/utilityFunctions");
const {
  getUserWithRole,
  getAllDocument,
  addAdocument,
  deleteADocumentById,
  updateADocumentById,
  getADocumentById,
  getADocumentByEmail,
} = require("../controllers/userController");

const UserRouter = express.Router();

UserRouter.get("/",verifyUser, verifyAdmin, getAllDocument);
UserRouter.post("/", addAdocument);
UserRouter.delete("/:id", verifyUser,verifyAdmin, deleteADocumentById);
UserRouter.patch("/:id", verifyUser, updateADocumentById);
UserRouter.get("/:id",verifyUser, getADocumentById);
UserRouter.get("/me/:email",verifyUser, getADocumentByEmail);
UserRouter.get("/role", getUserWithRole);

module.exports = UserRouter;
