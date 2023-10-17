import express from 'express';
import { TasksController } from '../controllers/task.js'
import { checkAuthentication } from '../middleware/index.js';

const router = express.Router();
const tasksController = new TasksController();

router.get("/", tasksController.getPagingProduct);
router.get("/alltask", checkAuthentication, tasksController.getAllTasks);
router.post("/newtask", tasksController.createTask)

export default router;