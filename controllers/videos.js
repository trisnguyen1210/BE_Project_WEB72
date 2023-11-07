import { TasksModel } from '../models/taskDB.js';
import joi from 'joi';
import { VideoModel } from '../models/videos.js';
import { uploadImage } from '../cloudinary/index.js';

export class VideosController {
    async getAllVideos(req, res) {
        try {
            console.log(`CheckAllVideo`);
            const result = await VideoModel.find()
            return res.status(200).json({ message: "success", videos: result })
        } catch (error) {
            return res.status(404).json({ message: `Can't found video` })
        }
    }

    async addNewVideo(req, res) {
        try {
            console.log(`AddNewVideo ${req.body.titleVideo}`);
            const titleVideo = req.body.titleVideo;
            const linkVideo = req.body.URL;
            const thumbnailVideo = req.files.thumbnailVideo;
            const contentVideo = req.body.contentVideo;
            const tagVideo = req.body.tagVideo.split(',');
            const videoSchema = joi.object({
                titleVideo: joi.string().required().max(100).messages({
                    "string.max": "Title nhỏ hơn 100 kí tự",
                    "any.require": "Không được để trống title video"
                }),
                linkVideo: joi.string().required().min(10).messages({
                    "string.min": "Link quá ngắn",
                    "any.require": "Không được để trống link video"
                })
            })
            const validate = videoSchema.validate({ titleVideo, linkVideo })
            if (validate.error) {
                console.log(validate.error)
                return res.status(400).json({ error: validate })
            }
            const uploadFile = await uploadImage(thumbnailVideo)
            const result = await VideoModel.create({ titleVideo, linkVideo, contentVideo, tagVideo, thumbnailVideo: uploadFile })
            return res.status(200).json({ message: "success", videoNew: result })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "fail", error: error })
        }
    }

    async getPagingVideo(req, res) {
        try {
            const pageSize = req.query.pageSize;
            const pageIndex = req.query.pageIndex;
            const videos = await VideoModel.find().skip(pageSize * pageIndex - pageSize).limit(pageSize)
            const count = await VideoModel.countDocuments()
            const totalPage = Math.ceil(count / pageSize)
            return res.status(200).json({ message: 'success', Info: { videos, count, totalPage } })
        } catch (error) {
            return res.status(400).json({ message: "fail", Info: error })
        }
    }

    async createTask(req, res) {
        try {
            console.log(`tạo new user ${req.body.title}`)
            const title = req.body.title;
            const timeStart = req.body.timeStart;
            const timeEnd = req.body.timeEnd;
            const taskSchema = joi.object({
                title: joi.string().required().min(3).max(100).messages({
                    "string.min": "3 kí tự trở lên",
                    "string.max": "Bé hơn 100 kí tự",
                    "string.base": "Kiểu dữ liệu phải là string",
                    "any.required": "Can't blank"
                })
            })
            const validate = taskSchema.validate({ title, timeStart, timeEnd })

            if (validate.error) {
                console.log(validate.error)
                return res.status(400).json({ error: validate })
            }

            const result = await TasksModel.create({ title, timeStart, timeEnd })
            return res.status(200).json({ message: "success", user: result })
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async getVideoId(req, res) {
        try {
            const id = req.params.id;
            const result = await VideoModel.find({ _id: id })
            return res.status(200).json({ message: 'success', Info: result })
        } catch (error) {
            console.log(error)
            return res.status(404).json({ message: 'can\'t found video' })
        }
    }

    async getPagingProduct(req, res) {
        try {
            const pageSize = req.query.pageSize;
            const pageIndex = req.query.pageIndex;
            const tasks = await TasksModel.find().skip(pageSize * pageIndex - pageSize).limit(pageSize)
            const count = await TasksModel.countDocuments()
            const totalPage = Math.ceil(count / pageSize)

            return res.status(200).json({ tasks, count, totalPage })
        } catch (error) {
            return res.status(400).json({ message: "fail", Info: error })
        }
    }
}