import express from "express";
import { login, register } from "../controllers/userController.js";
import { reverseGeocode } from "../controllers/geocodeController.js";

const router = express.Router();

//user routes
router.post("/sign-up", register);
router.post("/login", login);

//reverse Geocode route
router.get("/geocode", reverseGeocode);

export { router as Router };
