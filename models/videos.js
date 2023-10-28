import mongoose from "mongoose";

const Video = mongoose.Schema({
    titleVideo: { type: String, require: true },
    linkVideo: { type: String, require: true },
    thumbnail: { type: String },
    tag: { type: String },
    createBy: { type: String, ref: "Users", require: true },
}, { timestamps: true })

export const VideoModel = mongoose.model("videos", Video)