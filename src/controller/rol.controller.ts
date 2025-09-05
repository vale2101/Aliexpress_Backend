import { Request, Response } from "express";
import { HttpStatusCode } from "axios";
import {
  changeRol_post,
  createdRol_post,
  getRols_get,
  putRol_put,
} from "../models/rol.model";

export async function getRols(req: Request, res: Response): Promise<Response> {
  try {
    const response = await getRols_get();

    return res.status(HttpStatusCode.Ok).json({ data: response });
  } catch (error) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ message: "Server error", errorCode: error });
  }
}

export async function findRolById(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const response = await getRols_get();
        const role = response?.find(rolT => rolT.rolId === Number(id));
        return res.status(HttpStatusCode.Ok).json({ data: role });
    } catch (error) {
        return res.status(HttpStatusCode.BadRequest).json({ message: 'Server error', errorCode: error });
    }
}

export async function activedRol(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        await changeRol_post(Number(id), 1);

        return res.status(HttpStatusCode.Ok).json({ message: 'Role enabled' });
    } catch (error) {
        return res.status(HttpStatusCode.BadRequest).json({ message: 'Server error', errorCode: error });
    }
}

export async function createdRol(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { rolType, rolStaId } = req.body;

    const response = await createdRol_post(rolType, rolStaId);

    if (response !== null) {
      return res.status(HttpStatusCode.Ok).json({
        message: "Role created successfully",
      });
    } else {
      return res
        .status(HttpStatusCode.BadRequest)
        .json({ message: "Role was not added" });
    }
  } catch (error) {
    return res
      .status(HttpStatusCode.InternalServerError)
      .json({ message: "Server error", errorCode: error });
  }
}

export async function putRol(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const { rolType, rolStaId } = req.body;
        
        const success = await putRol_put(Number(id), rolType, rolStaId);

        if (success) {
            return res.status(HttpStatusCode.Ok).json({ message: 'Role updated successfully', data: success });
        } else {
            return res.status(HttpStatusCode.BadRequest).json({ message: 'Role was not updated' });
        }
    } catch (error) {
        return res.status(HttpStatusCode.BadRequest).json({ message: 'Server error', errorCode: error });
    }
}

export async function disabledRol(req: Request, res: Response): Promise<Response> {
    try {
        const { id } = req.params;
        const response = await changeRol_post(Number(id), 2)
        return res.status(HttpStatusCode.Ok).json({ message: 'Rol disable'});
    } catch (error) {
        return res.status(HttpStatusCode.BadRequest).json({ message: 'Could not disable rol', errorCode: error });
    }
}
