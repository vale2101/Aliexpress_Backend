import z from "zod";

// ✅ Crear usuario
export const createUserSchema = z.object({
  nombre: z.string().nonempty("El nombre es obligatorio"),
  apellido: z.string().nonempty("El apellido es obligatorio"),
  email: z.string().nonempty("El correo es obligatorio").email("El correo debe tener un formato válido"),
  contrasena: z.string().nonempty("La contraseña es obligatoria").min(6, "La contraseña debe tener al menos 6 caracteres"),
  telefono: z.string().optional(),
  rol: z.number().int("El rol debe ser un número entero").nonnegative("El rol debe ser positivo"),
  estado: z.enum(["activo", "suspendido", "eliminado"]).default("activo"),
});

// ✅ Actualizar usuario
export const updateUserSchema = z.object({
  nombre: z.string().min(3).max(50).optional(),
  apellido: z.string().min(3).max(50).optional(),
  email: z.string().email().optional(),
  contrasena: z.string().min(6).optional(),
  telefono: z.string().optional(),
  rol: z.number().int().nonnegative().optional(),
  estado: z.enum(["activo", "suspendido", "eliminado"]).optional(),
});

// ✅ Login usuario
export const loginUserSchema = z.object({
  email: z.string().nonempty("El correo es obligatorio").email("Debe ingresar un correo electrónico válido"),
  contrasena: z.string().nonempty("La contraseña es obligatoria"),
});
