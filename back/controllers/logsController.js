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
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const fetchLog = async (req, res) => {
  try {
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
