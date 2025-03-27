import express from "express";
import { login, register } from "../controllers/userController.js";

const router = express.Router();

//user routes
router.post("/sign-up", register);
router.post("/login", login);

export { router as Router };
