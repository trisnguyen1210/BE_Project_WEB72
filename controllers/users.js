//JsonWebtoken
import jwt from 'jsonwebtoken'
import joi from 'joi'
//Models
import { UsersModel } from '../models/userDB.js';
import { RolesModel } from '../models/roleDB.js';
import bcryptjs from 'bcryptjs';

export class UsersController {
    async getAllUsers(req, res) {
        try {
            console.log("Check All User")
            const result = await UsersModel.find()
            return res.status(200).json({ message: "success", Users: result })
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async getInfoUsers(req, res) {
        try {
            const uid = req.params.id.toString();
            console.log(`Check info user ${uid}`);
            const result = await UsersModel.find({ "_id": uid })
            return res.status(200).json({ message: "success", Info: result })
        } catch (error) {
            console.log(error)
            return res.status(404).json({ message: "false", Info: error })
        }
    }

    async createNewUser(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const salt = bcryptjs.genSaltSync()
            const hashPassword = bcryptjs.hashSync(password, salt)
            const role = req.body.role;
            const userCheck = await UsersModel.findOne({ username })
            console.log(userCheck)
            if (userCheck) {
                return res.status(400).json({ message: "Người dùng đã tồn tại" })
            }

            const userSchema = joi.object({
                username: joi.string().required().min(3).max(100).messages({
                    "string.min": "3 kí tự trở lên",
                    "string.max": "Bé hơn 100 kí tự",
                    "string.base": "Kiểu dữ liệu phải là string",
                    "any.required": "Can't blank"
                }),
                password: joi.string().required().messages({
                    "any.required": "Can't blank"
                })
            })
            const validate = userSchema.validate({ username, password })

            if (validate.error) {
                console.log(validate.error)
                return res.status(400).json({ error: validate })
            }
            console.log(`tạo new user ${req.body.username}`)
            const newUser = await UsersModel.create({ username, password: hashPassword, role })
            return res.status(200).json({ message: "success", user: newUser })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error })
        }
    }

    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const username = req.body.username;
            const password = req.body.password;
            const role = req.body.role;
            const userSchema = joi.object({
                username: joi.string().required().min(3).max(100).messages({
                    "string.min": "3 kí tự trở lên",
                    "string.max": "Bé hơn 100 kí tự",
                    "string.base": "Kiểu dữ liệu phải là string",
                    "any.required": "Can't blank"
                }),
                password: joi.string().required().messages({
                    "any.required": "Can't blank"
                })
            })
            const validate = userSchema.validate({ username, password })

            if (validate.error) {
                console.log(validate.error)
                return res.status(400).json({ error: validate })
            }
            console.log(`update user ${user}`)
            const user = await UsersModel.findOneAndUpdate({ _id: id }, {
                username, password, role
            }, { new: true })
            return res.status(200).json({ message: "success", updateUser: user })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.message || "Failed" })
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            console.log(`delete user ${id}`)
            const user = await UsersModel.findOneAndDelete({ _id: id })
            return res.status(200).json({ message: "success", deleteUser: user })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.message || "Failed" })
        }
    }
}

export class RolesController {
    async getAllRoles(req, res) {
        try {
            console.log("Check All Role")
            const result = await RolesModel.find()
            return res.status(200).json({ message: "success", Roles: result })
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    async getInfoRole(req, res) {
        try {
            const rankInfo = Number(req.params.rank)
            console.log(`Check role ${rankInfo}`)
            const result = await RolesModel.find({ "rank": rankInfo })
            return res.status(200).json({ message: "success", Info: result })
        }
        catch (error) {
            return res.status(404).json({ message: "false", Info: "Can't find role" })
        }
    }
}

export const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const checkExist = await UsersModel.findOne({ "username": username })

    if (!checkExist) {
        return res.status(404).json({ message: `Can't found user` })
    }
    if (!(checkExist.password == password)) {
        return res.status(401).json({ message: `Wrong password` })
    }

    const token = jwt.sign({
        id: checkExist.id
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    })

    return res.status(200).json({ user: checkExist, token: token })
}

export const signUp = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const salt = bcryptjs.genSaltSync()
        const hashPassword = bcryptjs.hashSync(password, salt)
        const role = req.body.role;
        const userCheck = await UsersModel.findOne({ username })
        console.log(userCheck)
        if (userCheck) {
            return res.status(400).json({ message: "Người dùng đã tồn tại" })
        }

        const userSchema = joi.object({
            username: joi.string().required().min(3).max(100).messages({
                "string.min": "3 kí tự trở lên",
                "string.max": "Bé hơn 100 kí tự",
                "string.base": "Kiểu dữ liệu phải là string",
                "any.required": "Can't blank"
            }),
            password: joi.string().required().messages({
                "any.required": "Can't blank"
            })
        })
        const validate = userSchema.validate({ username, password })

        if (validate.error) {
            console.log(validate.error)
            return res.status(400).json({ error: validate })
        }
        console.log(`tạo new user ${req.body.username}`)
        const newUser = await UsersModel.create({ username, password: hashPassword, role })
        return res.status(200).json({ message: "success", user: newUser })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}

// export const updateUser = (req, res) => {
//     const id = req.params.id;
//     const newUserName = req.body.username;

//     const updateData = users.map(user => {
//         const stringUserId = user.id.toString();
//         if (stringUserId === id) {
//             user.username = newUserName;
//         }
//         return user;
//     })
//     return res.status(200).json({
//         message: "Update User Success", user: updateData
//     })
// }