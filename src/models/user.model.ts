import MySQLConnector from '../db/connection';
import { userInterface } from '../interfaces/interfaces';

const db = new MySQLConnector();

// 🔹 Obtener todos los usuarios
export async function getUsers_get(): Promise<userInterface[]> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM usuarios';
    const response: any = await db.query(sql);
    db.close();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 🔹 Obtener un usuario por ID
export async function getUserById_get(idUsuario: number): Promise<userInterface | null> {
  try {
    await db.connect();
    const sql = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    const response: any = await db.query(sql, [idUsuario]);
    db.close();
    return response.length > 0 ? response[0] : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 🔹 Crear usuario
export async function createUser_post(user: userInterface): Promise<boolean> {
  try {
    await db.connect();
    const sql = `INSERT INTO usuarios 
      (nombre, apellido, email, contrasena, telefono, rol, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const response: any = await db.query(sql, [
      user.nombre,
      user.apellido,
      user.email,
      user.contrasena,
      user.telefono,
      user.rol,
      user.estado || 'activo',
    ]);
    db.close();
    return response.affectedRows > 0 ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Actualizar usuario
export async function updateUser_put(user: userInterface): Promise<boolean> {
  try {
    await db.connect();
    const sql = `UPDATE usuarios 
      SET nombre = ?, apellido = ?, email = ?, contrasena = ?, telefono = ?, rol = ?, estado = ? 
      WHERE id_usuario = ?`;
    const response: any = await db.query(sql, [
      user.nombre,
      user.apellido,
      user.email,
      user.contrasena,
      user.telefono,
      user.rol,
      user.estado,
      user.id_usuario,
    ]);
    db.close();
    return response.affectedRows > 0 ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Cambiar estado (activo, suspendido, eliminado)
export async function changeUserState_put(idUsuario: number, estado: string): Promise<boolean> {
  try {
    await db.connect();
    const sql = 'UPDATE usuarios SET estado = ? WHERE id_usuario = ?';
    const response: any = await db.query(sql, [estado, idUsuario]);
    db.close();
    return response.affectedRows > 0 ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// 🔹 Eliminar usuario (DELETE físico)
export async function deleteUser_delete(idUsuario: number): Promise<boolean> {
  try {
    await db.connect();
    const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
    const response: any = await db.query(sql, [idUsuario]);
    db.close();
    return response.affectedRows > 0 ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
