import { Request, Response } from "express";
import _ from "lodash";
import AppointmentSchema from "../models/appointment";

// create appointment
const createAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = await req.body;

    const appointment = {
      title: data.title,
      startTime: data.startTime,
      endTime: data.endTime,
      duration: data.duration,
      count: 0,
      date: data.date,
    };

    const obj = new AppointmentSchema(appointment);

    AppointmentSchema.create(obj)
      .then((data) => {
        res.status(200).json({ message: "Appointment created!" });
      })
      .catch((error) => {
        console.log(error);
        res
          .status(400)
          .json({ error: "Appointment creation failed! " + error });
      });
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: "99 88 failed!" + error });
  }
};

// view appointments
const viewAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointment = await AppointmentSchema.find();
    const reverseAppointment = _.reverse(appointment);
    res.status(200).send(reverseAppointment);
  } catch (error) {
    res.status(400).json({ error: "Cannot fetch all appointment!" });
  }
};
export { createAppointment, viewAppointment };
