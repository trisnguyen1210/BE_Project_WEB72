import { checkAuthentication, checkAuthorization } from '../middleware/index.js';
import usersRouter from './users.js'
import tasksRouter from './tasks.js'
import loginRouter from './login.js'
import express from 'express';

const router = express.Router()

router.use('/login', loginRouter)
router.use('/users', usersRouter);
router.use('/tasks', tasksRouter)


export default router;