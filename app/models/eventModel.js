const { client } = require("../db/db");
const database = client.db("radiumcommunitycenterDB");
const eventCollection = database.collection("events");
module.exports = eventCollection;
