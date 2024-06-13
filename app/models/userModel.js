const { client } = require("../db/db");
const database = client.db("radiumcommunitycenterDB");
const userCollection = database.collection("users");
module.exports = userCollection;
