import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true }
}, { timestamps: true })

export const UsersModel = mongoose.model('users', UsersSchema, 'users', { autoCreate: false });
