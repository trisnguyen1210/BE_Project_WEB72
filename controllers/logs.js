import { LogsModel } from "../models/logs.js";

export class LogsController {
    async getAllLogs(req, res) {
        try {
            const result = await LogsModel.find();
            return res.status(200).json({ status: 'success', Info: result })
        } catch (error) {
            return res.status(404).json({ status: 'error', Info: error })
        }
    }

    async getLogsPaging(req, res) {
        try {
            const pageSize = req.query.pageSize;
            const pageIndex = req.query.pageIndex;
            const logs = await LogsModel.find().sort({ updatedAt: -1 }).skip(pageSize * pageIndex - pageSize).limit(pageSize)
            const count = await LogsModel.countDocuments()
            const totalPage = Math.ceil(count / pageSize)
            return res.status(200).json({ message: 'success', Info: { logs, count, totalPage } })
        } catch (error) {
            return res.status(400).json({ status: 'error', Info: error })
        }
    }
}