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
