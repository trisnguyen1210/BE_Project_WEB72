import mongoose from "mongoose";

const Video = mongoose.Schema({
    titleVideo: { type: String, require: true },
    linkVideo: { type: String, require: true },
    thumbnailVideo: { type: Object, require: true },
    tagVideo: { type: Array },
    createBy: { type: String, ref: "Users", require: true },
    contentVideo: { type: String }
}, { timestamps: true })

export const VideoModel = mongoose.model("videos", Video)