const { client } = require("../db/db");
const database = client.db("radiumcommunitycenterDB");
const paymentCollection = database.collection("users");
module.exports = paymentCollection;
