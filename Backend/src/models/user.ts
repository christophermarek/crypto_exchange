import { userType } from "../types/userType";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
  },
)

export const user = model<userType>("user", userSchema);


