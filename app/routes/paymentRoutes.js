const express = require("express");
const paymentRouter = express.Router();
const { paymentSuccess, paymentFail, paymentCancel, paymentInitialize } = require("../controllers/paymentControllers");


// paymentRouter.get("/", getAllDocument);
paymentRouter.post("/payment/success", paymentSuccess);
paymentRouter.post("/payment/fail", paymentFail);
paymentRouter.post("/payment/cancel", paymentCancel);
paymentRouter.patch("/initialize", paymentInitialize);


module.exports = paymentRouter;



  