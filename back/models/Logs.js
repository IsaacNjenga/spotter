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
  currentTime: { type: String },
});

const logsSchema = new mongoose.Schema(
  {
    dropoffLocation: { type: String },
    pickupLocation: { type: String },
    pickupTime: { type: String },
    pickupDate: { type: Date },
    dropoffTime: { type: String },
    dropoffDate: { type: Date },
    currentLocations: { type: [locationSchema], default: [] },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { collection: "logs", timestamps: true }
);

const LogsModel = mongoose.model("Logs", logsSchema);
export default LogsModel;
