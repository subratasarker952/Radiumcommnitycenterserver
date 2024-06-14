const { client } = require("../db/db");
const database = client.db("radiumCommunityCenterDB");
const bookingCollection = database.collection("bookings");
module.exports = bookingCollection;
