const { client } = require("../db/db");
const database = client.db("radiumCommunityCenterDB");
const bookingCollection = database.collection("users");
module.exports = bookingCollection;
