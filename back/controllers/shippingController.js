import mongoose from "mongoose";
import ShippingModel from "../models/ShippingLog.js";

const createShippingLog = async (req, res) => {
  try {
    const newLog = new ShippingModel({ ...req.body });
    await newLog.save();

    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const fetchShippingLogs = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res
      .status(400)
      .json({ error: "No ID specified. Contact your technician" });
  }
  try {
    const objectId = new mongoose.Types.objectId(id);
    const shippingLogs = await ShippingModel.find({ createdBy: objectId });
    res.status(201).json({ success: true, shippingLogs });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const fetchShippingLog = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res
      .status(400)
      .json({ error: "No ID specified. Contact your technician" });
  }
  try {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);

    const objectId = new mongoose.Types.ObjectId(id);
    const shippingLog = await ShippingModel.find({
      createdBy: objectId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    res.status(201).json({ success: true, shippingLog });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateShippingLog = async (req, res) => {
  const id = req.params;
  if (!id) {
    return res.status(400).json({ error: "No ID specified" });
  }
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const updatedShippingLog = await LogsModel.findByIdAndUpdate(
      { _id: objectId },
      { $set: req.body },
      { new: true }
    );
    res.status(201).json({ success: true, updatedShippingLog });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createShippingLog,
  fetchShippingLog,
  fetchShippingLogs,
  updateShippingLog,
};
