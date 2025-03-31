import mongoose from "mongoose";
import LogsModel from "../models/Logs.js";

const createLog = async (req, res) => {
  try {
    const newLog = new LogsModel({ ...req.body });
    await newLog.save();

    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const fetchLogs = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res
      .status(400)
      .json({ error: "No ID specified. Contact your technician" });
  }
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const logs = await LogsModel.find({ createdBy: objectId });
    res.status(200).json({ success: true, logs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const fetchLog = async (req, res) => {
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
    const log = await LogsModel.find({
      createdBy: objectId,
      pickupDate: { $gte: startOfDay, $lt: endOfDay },
    });

    res.status(200).json({ success: true, log });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateLog = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export { createLog, fetchLogs, fetchLog, updateLog };
