import mongoose from "mongoose";

const RolesSchema = new mongoose.Schema({
    rank: { type: Number, require: true },
    name: { type: String, require: true },
    permission: { type: Array, key: { type: String }, action: { type: String } },
})

export const RolesModel = mongoose.model('Roles', RolesSchema, 'Roles', { autoCreate: false });