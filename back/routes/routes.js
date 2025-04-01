import express from "express";
import { login, register } from "../controllers/userController.js";
import { reverseGeocode } from "../controllers/geocodeController.js";
import {
  createLog,
  fetchLog,
  fetchLogs,
  updateLog,
} from "../controllers/logsController.js";
import {
  createShippingLog,
  fetchShippingLog,
  fetchShippingLogs,
  updateShippingLog,
} from "../controllers/shippingController.js";

const router = express.Router();

//user routes
router.post("/sign-up", register);
router.post("/login", login);

//logs routes
router.post("/create-log", createLog);
router.get("/get-all-logs", fetchLogs);
router.get("/get-log", fetchLog);
router.put("/update-log/:id", updateLog);

//shipping routes
router.post("/create-shipping-log", createShippingLog);
router.get("/get-all-shipping-logs", fetchShippingLogs);
router.get("/get-shipping-log", fetchShippingLog);
router.put("/update-log/:id", updateShippingLog);

//reverse Geocode route
router.get("/geocode", reverseGeocode);

export { router as Router };
