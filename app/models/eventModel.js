const { client } = require("../db/db");
const database = client.db("radiumCommunityCenterDB");
const eventCollection = database.collection("events");
module.exports = eventCollection;
