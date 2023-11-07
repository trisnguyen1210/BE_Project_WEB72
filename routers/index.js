import { checkAuthentication, checkAuthorization } from '../middleware/index.js';
import usersRouter from './users.js'
import loginRouter from './login.js'
import videosRouter from './videos.js'
import express from 'express';

const router = express.Router()

router.use('/login', loginRouter)
router.use('/users', usersRouter);
router.use('/video', videosRouter);


export default router;