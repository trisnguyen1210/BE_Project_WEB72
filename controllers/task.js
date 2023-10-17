import { TasksModel } from '../models/taskDB.js';
import joi from 'joi';

export class TasksController {
    async getAllTasks(req, res) {
        try {
            console.log(`Check All Tasks`);
            const result = await TasksModel.find()
            return res.status(200).json({ message: "success", Tasks: result })
        } catch (error) {
            return res.status(404).json({ message: `404 not found` })
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