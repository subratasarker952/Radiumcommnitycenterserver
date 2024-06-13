const { ObjectId } = require("mongodb");
const userCollection = require("../models/userModel");

const getAllDocument = async (req, res) => {
  const users = await userCollection.find().toArray();
  return res.send(users);
};
const addAdocument = async (req, res) => {
  const user = req.body;
  const email = req.body.email;
  const query = { email: email };
  const exist = await userCollection.findOne(query);
  if (!exist) {
    const result = await userCollection.insertOne(user);
    return res.send(result);
  }
  return res.send({ message: "user exist in db" });
};
const deleteADocumentById = async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await userCollection.deleteOne(query);
  return res.send(result);
};
const updateADocumentById = async (req, res) => {
  const query = { email: req.user.email };
  const data = req.body;
  const doc = {
    $set: { data },
  };
  const result = await userCollection.updateOne(query, doc);
  return res.send(result);
};
const getADocumentById = async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const user = await userCollection.findOne(query);
  return res.send(user);
};
const getADocumentByEmail = async (req, res) => {
  const { email } = req.params;
  const query = { email };
  const user = await userCollection.findOne(query);
  return res.send(user);
};

const getUserWithRole = async (req, res) => {
  const email = req.query.email;
  const userWithRole = await userCollection.findOne({ email });
  return res.send(userWithRole);
};

module.exports = {
  getAllDocument,
  addAdocument,
  deleteADocumentById,
  updateADocumentById,
  getADocumentById,
  getADocumentByEmail,
  getUserWithRole,
};
