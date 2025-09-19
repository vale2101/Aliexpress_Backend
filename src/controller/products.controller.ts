import { Request, Response } from "express";
import {
  getProductos_get,
  getProductoById_get,
  createProducto_post,
  updateProducto_put,
  changeProductoState_put,
  deleteProducto_delete,
} from "../models/products.model";

// 🔹 GET all productos
export async function getProductos(req: Request, res: Response): Promise<Response> {
  try {
    const productos = await getProductos_get();
    return res.status(200).json({ data: productos });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener productos" });
  }
}

// 🔹 GET producto por ID
export async function getProductoById(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const producto = await getProductoById_get(Number(id));

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json({ data: producto });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

// 🔹 POST crear producto
export async function createProducto(req: Request, res: Response): Promise<Response> {
  try {
    const { nombre, precio, stock, imagen_url } = req.body;

    // Validación básica
    if (!nombre || !precio || !stock) {
      return res.status(400).json({ message: "Nombre, precio y stock son obligatorios" });
    }

    // Se envía el body completo, incluyendo imagen_url
    const success = await createProducto_post({
      ...req.body,
      imagen_url: imagen_url || null,
    });

    if (!success) {
      return res.status(400).json({ message: "No se pudo crear el producto" });
    }

    return res.status(201).json({ message: "Producto creado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

// 🔹 PUT actualizar producto
export async function updateProducto(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { imagen_url } = req.body;

    const success = await updateProducto_put({
      ...req.body,
      id_producto: Number(id),
      imagen_url: imagen_url || null,
    });

    if (!success) {
      return res.status(400).json({ message: "No se pudo actualizar el producto" });
    }

    return res.status(200).json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

// 🔹 PATCH cambiar estado
export async function changeProductoState(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ message: "El campo estado es obligatorio" });
    }

    const success = await changeProductoState_put(Number(id), estado);

    if (!success) {
      return res.status(400).json({ message: "No se pudo cambiar el estado del producto" });
    }

    return res.status(200).json({ message: `Producto cambiado a estado ${estado}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

// 🔹 DELETE eliminar producto
export async function deleteProducto(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const success = await deleteProducto_delete(Number(id));

    if (!success) {
      return res.status(400).json({ message: "No se pudo eliminar el producto" });
    }

    return res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}
