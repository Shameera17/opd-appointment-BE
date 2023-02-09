import { ObjectId } from "bson";

export interface Appointment extends Document {
  title: string;
  startTime: string;
  endTime: string;
  duration: string;
  count?: number;
  date: Date;
}
export interface Booking {
  appointmentNo: number;
  patientName: string;
  date: string;
  email: string;
  address: string;
  mobileNo: string;
  appointment: ObjectId;
  date: Date;
}
export interface Staff {
  id: string;
  username: string;
  password: string;
}
