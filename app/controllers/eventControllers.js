const { ObjectId } = require("mongodb");
const eventCollection = require("../models/eventModel");

const getAllDocument = async (req, res) => {
  const filterQuery = req?.query?.filter;
  let events;
  if (filterQuery == "bestMatch") {
    events = await eventCollection.find().sort({ name: 1 }).toArray();
  } else if (filterQuery == "piceHighToLow") {
    events = await eventCollection.find().sort({ price: -1 }).toArray();
  } else if (filterQuery == "priceLowToHigh") {
    events = await eventCollection.find().sort({ price: 1 }).toArray();
  } else {
    events = await eventCollection.find().toArray();
  }
  return res.send(events);
};

const addADocument = async (req, res) => {
  const product = req.body;
  const result = await eventCollection.insertOne(product);
  return res.send(result);
};

const deleteADocumentById = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const result = await eventCollection.deleteOne(filter);
  return res.send(result);
};

const updateADocumentById = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const doc = req.body;
  const result = await eventCollection.updateOne(filter, doc);
  return res.send(result);
};
const getADocumentById = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const product = await eventCollection.findOne(query);
  return res.send(product);
};

module.exports = {
  getAllDocument,
  addADocument,
  deleteADocumentById,
  updateADocumentById,
  getADocumentById,
};
