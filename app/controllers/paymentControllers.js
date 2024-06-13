const { ObjectId } = require("mongodb");
const paymentCollection = require("../models/paymentModel");
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
  const order = req.body;
  const id = req.params.id;
  const tran_id = uuid.v4();

  const filter = { _id: new ObjectId(id) };
  await orderCollection.updateOne(filter, {
    $set: {
      ...order,
      tran_id: tran_id,
    },
  });

  const data = {
    total_amount: order.amount,
    currency: order.currency,
    tran_id: tran_id,
    success_url: `${process.env.SERVER_URL}/payments/payment/success?tran_id=${tran_id}`,
    fail_url: `${process.env.SERVER_URL}/payments/payment/fail?tran_id=${tran_id}`,
    cancel_url: `${process.env.SERVER_URL}/payments/payment/cancel?tran_id=${tran_id}`,
    ipn_url: `${process.env.SERVER_URL}/payments/payment/ipn`,
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: order.name,
    cus_email: order.email,
    cus_add1: order.village,
    cus_add2: order.upoZilla,
    cus_city: order.zilla,
    cus_state: order.street,
    cus_postcode: order.postcode,
    cus_country: order.country,
    cus_phone: order.phone,
    cus_fax: "01711111",
    ship_name: order.name,
    ship_add1: order.village,
    ship_add2: order.upoZilla,
    ship_city: order.zilla,
    ship_state: order.street,
    ship_postcode: order.postcode,
    ship_country: order.country,
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
const getADocumentById = (req, res) => {};
const getADocumentByTransId = (req, res) => {};
const getAllDocumentByEmail = (req, res) => {};

module.exports = {
  paymentSuccess,
  paymentFail,
  paymentCancel,
  paymentInitialize,
  getADocumentById,
  getADocumentByTransId,
  getAllDocumentByEmail,
};
