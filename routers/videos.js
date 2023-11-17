import express from 'express';
import { VideosController } from '../controllers/videos.js'
import { checkAuthentication } from '../middleware/index.js';

const router = express.Router()
const videosController = new VideosController

router.get("/", videosController.getAllVideos)
router.post("/addVideo", videosController.addNewVideo)
router.put("/update-video/:id", checkAuthentication, videosController.updateVideo)
router.get("/get-paging-video-admin", checkAuthentication, videosController.getPagingVideo)
router.delete("/delete-video/:id", checkAuthentication, videosController.deleteVideo)
router.get("/id/:id", videosController.getVideoId)

export default router;