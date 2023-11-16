import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema({
    rank: { type: Number, required: true },
    name: { type: String, required: true },
    permission: { type: Array, key: { type: String }, action: { type: String } },
})

export const RolesModel = mongoose.model('roles', RolesSchema, 'roles', { autoCreate: false });