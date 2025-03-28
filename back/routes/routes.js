import express from "express";
import { login, register } from "../controllers/userController.js";
import { reverseGeocode } from "../controllers/geocodeController.js";
import {
  createLog,
  fetchLog,
  fetchLogs,
  updateLog,
} from "../controllers/logsController.js";

const router = express.Router();

//user routes
router.post("/sign-up", register);
router.post("/login", login);

//logs routes
router.post("/create-log", createLog);
router.get("/get-all-logs", fetchLogs);
router.get("/get-log", fetchLog);
router.put("/update-log", updateLog);

//reverse Geocode route
router.get("/geocode", reverseGeocode);

export { router as Router };
