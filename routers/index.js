import { checkAuthentication, checkAuthorization } from '../middleware/index.js';
import usersRouter from './users.js'
import loginRouter from './login.js'
import videosRouter from './videos.js'
import logRouter from './logs.js'
import express from 'express';

const router = express.Router();

router.use('/login', loginRouter);
router.use('/users', usersRouter);
router.use('/video', videosRouter);
router.use('/logs', logRouter);

export default router;