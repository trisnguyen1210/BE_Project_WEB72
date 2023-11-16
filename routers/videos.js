import express from 'express';
import { VideosController } from '../controllers/videos.js'

const router = express.Router()
const videosController = new VideosController

router.get("/", videosController.getAllVideos)
router.post("/addVideo", videosController.addNewVideo)
router.put("/update-video/:id", videosController.updateVideo)
router.get("/get-paging-video-admin", videosController.getPagingVideo)
router.delete("/delete-video/:id", videosController.deleteVideo)
router.get("/id/:id", videosController.getVideoId)

export default router;