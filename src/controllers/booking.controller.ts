import { ObjectId } from "bson";
import { Request, Response } from "express";
import _ from "lodash";
import AppointmentSchema from "../models/appointment";
import BookingSchema from "../models/booking";
import { Booking } from "../types";

// create booking
const createBooking = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await req.body;
    const appointmentId = data?.id;
    const appointmentCount = data?.count + 1;

    const booking: Booking = {
      appointmentNo: appointmentCount,
      patientName: data.name,
      mobileNo: data.mobileNo,
      email: data.email,
      address: data.address,
      appointment: new ObjectId(appointmentId),
      date: data.date,
    };

    const obj = new BookingSchema(booking);

    Promise.all([
      BookingSchema.create(obj),
      AppointmentSchema.findByIdAndUpdate(appointmentId, {
        $set: { count: appointmentCount },
      }),
    ])
      .then((data) => {
        res.status(200).json({ message: "Booking created!" });
      })
      .catch((error) => {
        res.status(400).json({ error: "Booking creation failed!" });
      });
  } catch (error) {
    res.status(400).json({ error: "Booking creation failed!" });
  }
};
// view bookings
const viewBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings = await BookingSchema.find();
    const reversebookings = _.reverse(bookings);
    res.status(200).send(reversebookings);
  } catch (error) {
    res.status(400).json({ error: "Cannot fetch all bookings!" });
  }
};

// filter bookings
const filterBookingsByDates = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const date = req.body.date;
    const bookings = await BookingSchema.find({ date: date });
    const reversebookings = _.reverse(bookings);
    res.status(200).send(reversebookings);
  } catch (error) {
    res.status(400).json({ error: "Cannot fetch all bookings!" });
  }
};
export { createBooking, viewBookings, filterBookingsByDates };
