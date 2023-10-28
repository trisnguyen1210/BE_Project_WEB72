import express from 'express';
import { TasksController } from '../controllers/task.js';

const router = express.Router()
const taskController = new TasksController
router.get("/", taskController.getAllVideos)
router.post("/addVideo", taskController.addNewVideo)

export default router;