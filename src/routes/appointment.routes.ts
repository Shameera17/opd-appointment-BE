import express from "express";
const router = express.Router();

import {
  createAppointment,
  viewAppointment,
} from "../controllers/appointment.contoller";

router.post("/appointment/create", createAppointment);
router.get("/appointment/view", viewAppointment);

module.exports = router;
