import { Router } from "express";
import { validateSchema } from "../middleware/validateSchemas.middleware";
import { createUserSchema, updateUserSchema, loginUserSchema } from "../schemas/user.schemas";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  changeUserState,
  deleteUser,
  loginUser,
} from "../controller/user.controller";

const router = Router();

router.get("/getUsers", getUsers);
router.get("/findUserById/:id", getUserById);
router.post("/createUser", validateSchema(createUserSchema), createUser);
router.put("/updateUser/:id", validateSchema(updateUserSchema), updateUser);
router.patch("/:id/state", changeUserState);
router.delete("/delete/:id", deleteUser);
router.post("/login", validateSchema(loginUserSchema), loginUser);

export default router;
