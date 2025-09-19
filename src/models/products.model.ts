import MySQLConnector from "../db/connection";
import { ProductoInterface } from "../interfaces/interfaces";

const db = new MySQLConnector();

// 🔹 Obtener todos los productos
export async function getProductos_get(): Promise<ProductoInterface[]> {
  try {
    await db.connect();
    const sql = "SELECT * FROM productos";
    const response: any = await db.query(sql);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Obtener producto por ID
export async function getProductoById_get(idProducto: number): Promise<ProductoInterface | null> {
  try {
    await db.connect();
    const sql = "SELECT * FROM productos WHERE id_producto = ?";
    const response: any = await db.query(sql, [idProducto]);
    db.close();
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 🔹 Crear producto
export async function createProducto_post(producto: ProductoInterface): Promise<boolean> {
  try {
    await db.connect();
    const sql = `
      INSERT INTO productos 
      (nombre, descripcion, precio, precio_original, descuento, moneda, stock, estado, 
       material, color, peso, dimensiones, descripcionCom, imagen_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const response: any = await db.query(sql, [
      producto.nombre,
      producto.descripcion || null,
      producto.precio,
      producto.precio_original || null,
      producto.descuento || null,
      producto.moneda || "COP",
      producto.stock,
      producto.estado || "activo",
      producto.material || null,
      producto.color || null,
      producto.peso || null,
      producto.dimensiones || null,
      producto.descripcionCom || null,
      producto.imagen_url || null, // 👈 Nuevo campo
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Actualizar producto
export async function updateProducto_put(producto: ProductoInterface): Promise<boolean> {
  try {
    await db.connect();
    const sql = `
      UPDATE productos 
      SET nombre = ?, descripcion = ?, precio = ?, precio_original = ?, 
          descuento = ?, moneda = ?, stock = ?, estado = ?, 
          material = ?, color = ?, peso = ?, dimensiones = ?, descripcionCom = ?, imagen_url = ?
      WHERE id_producto = ?
    `;
    const response: any = await db.query(sql, [
      producto.nombre,
      producto.descripcion || null,
      producto.precio,
      producto.precio_original || null,
      producto.descuento || null,
      producto.moneda || "COP",
      producto.stock,
      producto.estado || "activo",
      producto.material || null,
      producto.color || null,
      producto.peso || null,
      producto.dimensiones || null,
      producto.descripcionCom || null,
      producto.imagen_url || null, // 👈 Nuevo campo
      producto.id_producto,
    ]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Cambiar estado (activo/inactivo)
export async function changeProductoState_put(idProducto: number, estado: string): Promise<boolean> {
  try {
    await db.connect();
    const sql = "UPDATE productos SET estado = ? WHERE id_producto = ?";
    const response: any = await db.query(sql, [estado, idProducto]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Eliminar producto (DELETE físico)
export async function deleteProducto_delete(idProducto: number): Promise<boolean> {
  try {
    await db.connect();
    const sql = "DELETE FROM productos WHERE id_producto = ?";
    const response: any = await db.query(sql, [idProducto]);
    db.close();
    return response.affectedRows > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}
