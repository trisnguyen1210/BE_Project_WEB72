import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: Number, require: true }
}, { timestamps: true })

export const UsersModel = mongoose.model('Users', UsersSchema, 'Users', { autoCreate: false });
