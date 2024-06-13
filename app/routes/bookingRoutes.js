const express = require("express");
const bookingRouter = express.Router();
const { verifyUser, verifyAdmin } = require("../utils/utilityFunctions");
const { getAllDocument, addADocument, deleteADocumentById, updateADocumentById, getADocumentById, getAllDocumentByEmail } = require("../controllers/bookingControllers");

bookingRouter.get("/", verifyAdmin, getAllDocument);
bookingRouter.post("/", verifyUser, addADocument);
bookingRouter.delete("/:id", verifyUser, deleteADocumentById);
bookingRouter.patch("/:id", verifyUser, updateADocumentById);
bookingRouter.get("/:id", verifyUser, getADocumentById);
bookingRouter.get("/mybooking/:email", getAllDocumentByEmail);

module.exports = bookingRouter;
