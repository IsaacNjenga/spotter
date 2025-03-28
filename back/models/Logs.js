import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  currentLocation: { type: String },
  currentCoordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
  currentMode: {
    type: String,
    enum: ["Off-Duty", "Sleeper Berth", "Driving", "On-Duty"],
  },
  timestamp: { type: Date, default: Date.now },
});

const logsSchema = new mongoose.Schema(
  {
    dropoffLocation: { type: String },
    pickupLocation: { type: String },
    pickupTime: { type: Date },
    dropoffTime: { type: Date },
    currentLocations: { type: [locationSchema], default: [] },
  },
  { collection: "logs", timestamps: true }
);

const LogsModel = mongoose.model("Logs", logsSchema);
export default LogsModel;
