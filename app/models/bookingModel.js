const { client } = require("../db/db");
const database = client.db("radiumcommunitycenterDB");
const bookingCollection = database.collection("users");
module.exports = bookingCollection;
