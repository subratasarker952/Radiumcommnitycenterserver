const { ObjectId } = require("mongodb");
const bookingCollection = require("../models/bookingModel");
const SSLCommerzPayment = require("sslcommerz-lts");
const uuid = require("uuid");

const storeId = process.env.STORE_ID;
const storePassword = process.env.STORE_PASSWORD;
const isLive = false;

const paymentSuccess = async (req, res) => {
  const { tran_id } = req.query;
  const result = await orderCollection.updateOne(
    { tran_id },
    {
      $set: { paymentStatus: "paid", paidAt: new Date() },
    }
  );
  if (result.modifiedCount > 0) {
    res.redirect(
      `${process.env.CLIENT_URL}/payment/success?tran_id=${tran_id}`
    );
  }
};
const paymentFail = async (req, res) => {
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
    cancel_url: `${process.env.SERVER_URL}/payments/payment/cancel?tran_id=${tran_id}`,
    ipn_url: `${process.env.SERVER_URL}/payments/payment/ipn`,
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: booking.email,
    cus_email: booking.email,
    cus_add1: "",
    cus_add2: "",
    cus_city: "",
    cus_state: "",
    cus_postcode: "",
    cus_country: "Bangladesh",
    cus_phone: booking.mobile,
    cus_fax: "0171111",
    ship_name: "",
    ship_add1: "",
    ship_add2: "",
    ship_city: "",
    ship_state: "",
    ship_postcode: "",
    ship_country: "",
    multi_card_name: "mastercard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D",
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
