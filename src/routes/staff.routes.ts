import express from "express";
const router = express.Router();

import { signIn } from "../controllers/staff.controller";

router.post("/signIn", signIn);
module.exports = router;
