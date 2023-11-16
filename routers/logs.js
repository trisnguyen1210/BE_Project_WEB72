import express from 'express';
import { LogsController } from '../controllers/logs.js';

const router = express.Router()
const logsController = new LogsController();
router.get("/", logsController.getAllLogs)
router.get("/logs-pagging", logsController.getLogsPaging)

export default router;