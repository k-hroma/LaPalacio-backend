import { Schema, model } from "mongoose";
import { LoginUser, RegisterUser } from "../types/authTypes";


const userSchema = new Schema<RegisterUser>({
  nombre:{ type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique:true },
  password: { type: String, required: true, trim: true }
  
}, {versionKey:false})

const User = model<RegisterUser>("userSchema", userSchema)

const logUserSchema = new Schema<LoginUser>({
 email: { type: String, required: true, trim: true },
 password: { type: String, required: true, trim: true }
}, {versionKey:false})

const LogUser = model<LoginUser>("logUserSchema", logUserSchema)

export {User, LogUser }