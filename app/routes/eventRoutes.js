const express = require("express");
const eventRouter = express.Router();
const { verifyUser, verifyAdmin } = require("../utils/utilityFunctions");
const { getAllDocument, addAdocument, deleteADocumentById, updateADocumentById, getADocumentById } = require("../controllers/eventControllers");


eventRouter.get("/", getAllDocument);
eventRouter.post("/", verifyUser,verifyAdmin, addAdocument);
eventRouter.delete("/:id", verifyUser,verifyAdmin, deleteADocumentById);
eventRouter.patch("/:id", verifyUser,verifyAdmin, updateADocumentById);
eventRouter.get("/:id", getADocumentById);

module.exports = eventRouter;
