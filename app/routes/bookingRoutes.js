const express = require("express");
const bookingRouter = express.Router();
const { verifyUser, verifyAdmin } = require("../utils/utilityFunctions");
const {
  getAllDocument,
  addADocument,
  deleteADocumentById,
  updateADocumentById,
  getADocumentById,
  getAllDocumentByEmail,
  getADocumentByTrans_Id,
} = require("../controllers/bookingControllers");

bookingRouter.get("/", verifyUser,verifyAdmin, getAllDocument);
bookingRouter.post("/", verifyUser, addADocument);
bookingRouter.delete("/:id", verifyUser, deleteADocumentById);
bookingRouter.patch("/:id", verifyUser, updateADocumentById);
bookingRouter.get("/:id", verifyUser, getADocumentById);
bookingRouter.get("/tran_id/:tran_id", verifyUser, getADocumentByTrans_Id);
bookingRouter.get("/email/:email",verifyUser, getAllDocumentByEmail);

module.exports = bookingRouter;
