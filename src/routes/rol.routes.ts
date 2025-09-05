import { Router } from "express";
import {
  getRols,
  findRolById,
  disabledRol,
  activedRol,
  createdRol,
  putRol,
} from "../controller/rol.controller";
import { validateSchema } from "../middleware/validateSchemas.middleware";
import { putRolSchema, createRolSchema } from "../schemas/rols.schemas";

const router = Router();

router.get("/getRols", getRols);
router.get("/findRolById/:id", findRolById);
router.post("/disabledRol/:id", disabledRol);
router.post("/activedRol/:id", activedRol);
router.post("/createdRol", validateSchema(createRolSchema), createdRol);
router.put("/putRol/:id", validateSchema(putRolSchema), putRol);
export default router;
