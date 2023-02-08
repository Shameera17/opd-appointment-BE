import { model, Schema } from "mongoose";
import { Appointment } from "../types";

const AppointmentSchema = new Schema<Appointment>(
  {
    title: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
export default model<Appointment>("Appointment", AppointmentSchema);
