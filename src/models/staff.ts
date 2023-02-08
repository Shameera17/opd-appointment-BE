import { model, Schema } from "mongoose";
import { Staff } from "../types";
const StaffSchema = new Schema<Staff>(
  {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Staff>("Staff", StaffSchema);
