import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();

// init express app
const app = express();

// connect mongodb
const URI: any = process.env.URI;
mongoose
  .connect(URI)
  .then((data) => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection unsuccessful", err));

// config middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // import routes
const appointmentRoutes = require("./routes/appointment.routes");
const bookingRoutes = require("./routes/booking.routes");
const staffRoutes = require("./routes/staff.routes");

// // config route middleware
app.use("/api", appointmentRoutes);
app.use("/api", bookingRoutes);
app.use("/api", staffRoutes);

app.get("/", (req, res) => {
  res.json({ message: "HI" });
});

// server set up
const PORT = process.env.PORT;
app.listen(PORT, () => {
  if (!PORT) {
    console.log("server is not running");
  } else {
    console.log(`server is running @ http://localhost:${PORT}`);
  }
});
