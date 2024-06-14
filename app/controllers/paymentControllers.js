const { ObjectId } = require("mongodb");
const bookingCollection = require("../models/bookingModel");
const SSLCommerzPayment = require("sslcommerz-lts");
const uuid = require("uuid");

const storeId = process.env.STORE_ID;
const storePassword = process.env.STORE_PASSWORD;
const isLive = false;

const paymentSuccess = async (req, res) => {
  const { tran_id } = req.query;
  const result = await bookingCollection.updateOne(
    { tran_id },
    {
      $set: { paymentStatus: "paid", paidAt: new Date() },
    }
  );
if(result.modifiedCount>0){
  res.redirect(`${process.env.CLIENT_URL}/payment/success?tran_id=${tran_id}`);
}
};
const paymentFail = async (req, res) => {
  const { tran_id } = req.query;
  const result = await bookingCollection.updateOne(
    { tran_id },
    {
      $set: {
        paymentStatus: "due",
        orderStatus: "",
        tran_id: "",
        tryToPayAt: new Date(),
      },
    }
  );
  if (result.modifiedCount > 0) {
    res.redirect(`${process.env.CLIENT_URL}/payment/fail`);
  }
};
const paymentCancel = async (req, res) => {
  const { tran_id } = req.query;
  const result = await orderCollection.updateOne(
    { tran_id },
    {
      $set: {
        paymentStatus: "due",
        orderStatus: "",
        tran_id: "",
        tryToPayAt: new Date(),
      },
    }
  );
  if (result.modifiedCount > 0) {
    res.redirect(`${process.env.CLIENT_URL}/payment/cancel`);
  }
};

const paymentInitialize = async (req, res) => {
  const booking = req.body;
  const tran_id = uuid.v4();

  await bookingCollection.insertOne({ ...booking, tran_id });
  const data = {
    total_amount: booking.amount,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${process.env.SERVER_URL}/payments/payment/success?tran_id=${tran_id}`,
    fail_url: `${process.env.SERVER_URL}/payments/payment/fail?tran_id=${tran_id}`,
    cancel_url: `${process.env.SERVER_URL}/payments/payment/cancel`,
    ipn_url: `${process.env.SERVER_URL}/payments/payment/ipn`,
    shipping_method: "Courier",
    product_name: "ticket",
    product_category: "ticket",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: booking.email,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: booking.mobile,
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const sslcommer = new SSLCommerzPayment(storeId, storePassword, isLive);
  let url;
  await sslcommer.init(data).then((res) => {
    url = res.GatewayPageURL;
  });
  res.send({ url });
};

module.exports = {
  paymentSuccess,
  paymentFail,
  paymentCancel,
  paymentInitialize,
};
