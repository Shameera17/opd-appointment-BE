import express from "express";
const router = express.Router();

import {
  createBooking,
  filterBookingsByDates,
  viewBookings,
} from "../controllers/booking.controller";

router.post("/booking/create", createBooking);
router.get("/booking/view", viewBookings);
router.get("/booking/filterBooking", filterBookingsByDates);

module.exports = router;
