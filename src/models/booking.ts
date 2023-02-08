import { ObjectId } from "bson";
import { model, Schema } from "mongoose";
import { Booking } from "../types";

const BookingSchema = new Schema<Booking>(
  {
    appointmentNo: {
      type: Number,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    appointment: {
      type: ObjectId,
      ref: "Appointment",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model<Booking>("Booking", BookingSchema);
