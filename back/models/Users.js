import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    username: { type: String },
    avatarUrl: { type: String },
    avatarId: { type: String },
    phoneNumber: { type: String },
  },
  { collection: "users", timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
