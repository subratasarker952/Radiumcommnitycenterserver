const { client } = require("../db/db");
const database = client.db("radiumCommunityCenterDB");
const paymentCollection = database.collection("users");
module.exports = paymentCollection;
