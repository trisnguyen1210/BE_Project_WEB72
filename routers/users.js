import express from 'express';
import { RolesController, UsersController } from '../controllers/users.js'
import { checkAuthentication, checkAuthorization } from '../middleware/index.js';

const router = express.Router();
const usersController = new UsersController();
const rolesController = new RolesController();

router.get("/", checkAuthentication, checkAuthorization("user", "write"), usersController.getAllUsers);
router.get("/roles", checkAuthentication, checkAuthorization("user", "write"), rolesController.getAllRoles);
router.post("/newuser", checkAuthentication, checkAuthorization("user", "write"), usersController.createNewUser);
router.put("/updateuser/:id", usersController.updateUser)
router.delete("/deleteuser/:id", usersController.deleteUser)
router.get("/roles/:rank", rolesController.getInfoRole)
router.get("/:id", usersController.getInfoUsers);


export default router;