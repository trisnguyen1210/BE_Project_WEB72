import mongoose from "mongoose";

const Video = mongoose.Schema({
    titleVideo: { type: String, required: true },
    linkVideo: { type: String, required: true },
    thumbnailVideo: { type: Object, required: true },
    tagVideo: { type: Array },
    createBy: { type: String, ref: "Users", required: true },
    contentVideo: { type: String }
}, { timestamps: true })

export const VideoModel = mongoose.model("videos", Video)