import express from 'express';
import { UsersController, login } from '../controllers/users.js';

const router = express.Router()
const usersController = new UsersController();
router.post("/", login)

export default router;