import mongoose from "mongoose";

const shippingSchema = new mongoose.Schema(
  {
    carrierName: { type: String },
    codriverName: { type: String },
    date: { type: Date },
    from: { type: String },
    officeAddress: { type: String },
    terminalAddress: { type: String },
    to: { type: String },
    totalMileageToday: { type: String },
    totalMilesToday: { type: String },
    vehicleNumber: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { collection: "shippingLogs", timestamps: true }
);

const ShippingModel = mongoose.model("shippingLogs", shippingSchema);
export default ShippingModel;
