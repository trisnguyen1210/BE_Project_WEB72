import mongoose from "mongoose";

const LogsSchema = new mongoose.Schema({
    username: { type: String, required: true },
    log: { type: String },
}, { timestamps: true })

export const LogsModel = mongoose.model('logs', LogsSchema, 'logs', { autoCreate: false });