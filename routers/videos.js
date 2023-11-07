import express from 'express';
import { VideosController } from '../controllers/videos.js'
const router = express.Router()
const videosController = new VideosController
router.get("/", videosController.getAllVideos)
router.post("/addVideo", videosController.addNewVideo)
router.get("/get-paging-video-admin", videosController.getPagingVideo)
router.get("/id/:id", videosController.getVideoId)

export default router;