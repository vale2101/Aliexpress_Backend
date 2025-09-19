export interface rolInterface {
    rolId: number;
    rolType: string;
    rolStaId: number;
}
export interface userInterface {
    id_usuario?: number;
    nombre: string;
    apellido: string;
    email: string;
    contrasena: string;
    telefono?: string;
    fecha_registro?: string; 
    rol: number;
    estado?: 'activo' | 'suspendido' | 'eliminado';
}
export interface ProductoInterface {
  id_producto?: number; 
  nombre: string;
  descripcion?: string;
  precio: number;
  precio_original?: number;
  descuento?: number;
  moneda?: string; 
  stock: number;
  estado?: "activo" | "inactivo"; 
  fecha_publicacion?: string; 
  material?: string;
  color?: string;
  peso?: number;
  dimensiones?: string;
  descripcionCom?: string;
  imagen_url?: string;
}

