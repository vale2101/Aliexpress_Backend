import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
import {
  getUsers_get,
  getUserById_get,
  createUser_post,
  updateUser_put,
  changeUserState_put,
  deleteUser_delete,
} from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secretKey = "clave-secreta";

// 🔹 LOGIN
export async function loginUser(req: Request, res: Response): Promise<Response> {
  try {
    const { email, contrasena } = req.body;
    const users = await getUsers_get();
    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(HttpStatusCode.Unauthorized).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(contrasena, user.contrasena);
    if (!validPassword) {
      return res.status(HttpStatusCode.Unauthorized).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { userId: user.id_usuario, userRol: user.rol },
      secretKey,
      { expiresIn: "1h" }
    );

    return res.status(HttpStatusCode.Ok).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 GET all
export async function getUsers(req: Request, res: Response): Promise<Response> {
  try {
    const users = await getUsers_get();
    return res.status(HttpStatusCode.Ok).json({ data: users });
  } catch (error) {
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error al obtener usuarios" });
  }
}

// 🔹 GET by ID
export async function getUserById(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const user = await getUserById_get(Number(id));
    if (!user) {
      return res.status(HttpStatusCode.NotFound).json({ message: "Usuario no encontrado" });
    }
    return res.status(HttpStatusCode.Ok).json({ data: user });
  } catch (error) {
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 POST create
export async function createUser(req: Request, res: Response): Promise<Response> {
  try {
    const { nombre, apellido, email, contrasena, telefono, rol, estado } = req.body;
    const passSalt = bcrypt.genSaltSync(10);
    const encryptedPass = bcrypt.hashSync(contrasena, passSalt);

    const success = await createUser_post({
      nombre,
      apellido,
      email,
      contrasena: encryptedPass,
      telefono,
      rol,
      estado,
    });

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo crear el usuario" });
    }
    return res.status(HttpStatusCode.Ok).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 PUT update
export async function updateUser(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, contrasena, telefono, rol, estado } = req.body;
    const encryptedPass = contrasena ? bcrypt.hashSync(contrasena, 10) : undefined;

    const success = await updateUser_put({
      id_usuario: Number(id),
      nombre,
      apellido,
      email,
      contrasena: encryptedPass || contrasena,
      telefono,
      rol,
      estado,
    });

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo actualizar el usuario" });
    }
    return res.status(HttpStatusCode.Ok).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 PATCH cambiar estado
export async function changeUserState(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const success = await changeUserState_put(Number(id), estado);

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo cambiar el estado" });
    }
    return res.status(HttpStatusCode.Ok).json({ message: `Usuario cambiado a estado ${estado}` });
  } catch (error) {
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}

// 🔹 DELETE eliminar
export async function deleteUser(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const success = await deleteUser_delete(Number(id));

    if (!success) {
      return res.status(HttpStatusCode.BadRequest).json({ message: "No se pudo eliminar el usuario" });
    }
    return res.status(HttpStatusCode.Ok).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatusCode.InternalServerError).json({ message: "Error en el servidor" });
  }
}
