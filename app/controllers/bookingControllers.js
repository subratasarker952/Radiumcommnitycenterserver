const { ObjectId } = require("mongodb");
const bookingCollection = require("../models/bookingModel");

const getAllDocument = async (req, res) => {
  const query = {};
  const bookings = await bookingCollection.find(query).toArray();
  return res.send(bookings);
};
const addADocument = async (req, res) => {
  const booking = req.body;
  const result = await bookingCollection.insertOne(booking);
  res.send(result);
};
const deleteADocumentById = async (req, res) => {
  const { id } = req.params;
  const filter = { _id: new ObjectId(id) };
  const result = await bookingCollection.deleteOne(filter);
  res.send(result);
};
const updateADocumentById = async (req, res) => {
  const { id } = req.params;
  const filter = { _id: new ObjectId(id) };
  const booking = req.body;
  const updateDoc = {
    $set: {
      ...booking,
    },
  };
  const result = await bookingCollection.updateOne(filter, updateDoc);
  res.send(result);
};
const getADocumentById = async (req, res) => {
  const { id } = req.params;
  const query = { _id: new ObjectId(id) };
  const booking = await bookingCollection.find(query);
  return res.send(booking);
};

const getAllDocumentByEmail = async (req, res) => {
  const query = req.user.email;
  const bookings = await bookingCollection.find({ email: query }).toArray();
  return res.send(bookings);
};

module.exports = {
  getAllDocument,
  addADocument,
  deleteADocumentById,
  updateADocumentById,
  getADocumentById,
  getAllDocumentByEmail,
};
