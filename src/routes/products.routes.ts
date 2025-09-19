import { Router } from "express";
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  changeProductoState,
  deleteProducto,
} from "../controller/products.controller";
import { createProductoSchema, updateProductoSchema } from "../schemas/products.schemas";
import { Request, Response, NextFunction } from "express";

const router = Router();

// ✅ Middleware para validar con Zod
const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
      return res.status(400).json({
        error: err.errors.map((e: any) => e.message),
      });
    }
  };

// 🔹 Rutas CRUD
router.post("/crearProducto", validate(createProductoSchema), createProducto);
router.get("/obtenerProductos", getProductos);
router.get("/obtenerProducto/:id", getProductoById);
router.put("/actualizarProducto/:id", validate(updateProductoSchema), updateProducto);
router.patch("/cambiarEstadoProducto/:id", changeProductoState);
router.delete("/eliminarProducto/:id", deleteProducto);

export default router;
