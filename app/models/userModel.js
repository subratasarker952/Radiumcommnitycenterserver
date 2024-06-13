const { client } = require("../db/db");
const database = client.db("radiumCommunityCenterDB");
const userCollection = database.collection("users");
module.exports = userCollection;
