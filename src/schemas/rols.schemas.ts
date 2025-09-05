import { z } from "zod";

export const putRolSchema = z.object({
  rolType: z
    .string()
    .min(1, "rolType: es un campo obligatorio"),
  rolStaId: z
    .number()
    .int("rolStaId: debe ser un número entero válido")
    .nonnegative("rolStaId: debe ser mayor o igual a 0"),
});

export const createRolSchema = z.object({
  rolType: z
    .string()
    .min(1, "rolType: es un campo obligatorio"),
  rolStaId: z
    .number()
    .int("rolStaId: debe ser un número entero válido")
    .nonnegative("rolStaId: debe ser mayor o igual a 0"),
});
