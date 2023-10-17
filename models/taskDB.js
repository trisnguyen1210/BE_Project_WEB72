import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema({
    title: { type: String, require: true },
    timeStart: { type: Number },
    timeEnd: { type: Number },
    location: { type: String },
    difficult: { type: Number }
}, { timestamps: true })

export const TasksModel = mongoose.model('Tasks', TasksSchema, 'Tasks', { autoCreate: false });
