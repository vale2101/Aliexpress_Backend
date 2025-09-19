import z from "zod";

// ✅ Crear producto
export const createProductoSchema = z.object({
  nombre: z.string().nonempty("El nombre es obligatorio"),
  descripcion: z.string().optional(),
  precio: z
    .number({ error: "El precio debe ser un número" })
    .positive("El precio debe ser mayor que 0"),
  precio_original: z.number().positive("El precio original debe ser mayor que 0").optional(),
  descuento: z.number().nonnegative("El descuento no puede ser negativo").optional(),
  moneda: z.string().max(10).default("COP"),
  stock: z
    .number({ error: "El stock debe ser un número" })
    .int("El stock debe ser un número entero")
    .nonnegative("El stock no puede ser negativo"),
  estado: z.enum(["activo", "inactivo"]).default("activo"),
});

// ✅ Actualizar producto
export const updateProductoSchema = z.object({
  nombre: z.string().min(3).max(255).optional(),
  descripcion: z.string().optional(),
  precio: z.number().positive().optional(),
  precio_original: z.number().positive().optional(),
  descuento: z.number().nonnegative().optional(),
  moneda: z.string().max(10).optional(),
  stock: z.number().int().nonnegative().optional(),
  estado: z.enum(["activo", "inactivo"]).optional(),
});
