import MySQLConnector from '../db/connection';
import { rolInterface } from '../interfaces/interfaces';
const db = new MySQLConnector();

export async function getRols_get(): Promise<Array<rolInterface> | null> {
    
    try {
        await db.connect()
        const sql = 'SELECT rol_type AS rolType, rol_id AS rolId, rol_sta_id AS rolState FROM rol;'

        const response: any = await db.query(sql);

        let returnData: Array<rolInterface> = [];

        response.forEach((rol: any) => {
            returnData.push({
                rolId: rol.rolId,
                rolType: rol.rolType,
                rolStaId: rol.rolState
            })
        });
         
        db.close();
        
        return returnData
    } catch (error) {
        return null
    }
}

export async function changeRol_post(idRol: number, idState: number): Promise<boolean> {
    try {
        await db.connect()
        const sql = `UPDATE rol set rol_sta_id = ${idState}  WHERE rol_id = ${idRol}`
        const response: any = await db.query(sql)
        return response.affectedRows > 0 ? true : false
    } catch (error) {
        return false
    }
}

export async function createdRol_post(rolType : string, rolStaId: number): Promise< boolean> {
    
    try {
        await db.connect()
        const sql = 'INSERT INTO rol (rol_type, rol_sta_id) VALUES (?, ?)'
        const values = [rolType, rolStaId]
        const response: any = await db.query(sql, values)
        
        return response.affectedRows > 0 ? true : false
    } catch (error) {
        return false
    }
}

export async function putRol_put(rol_id : number, rol_type: string, rol_sta_id: number): Promise<boolean> {
    try {
        await db.connect()
        const sql = 'UPDATE rol SET rol_type  = ?, rol_sta_id  = ?,  rol_updated_at =? WHERE rol_id = ?'
        const response: any = await db.query(sql, [ rol_type, rol_sta_id, new Date(), rol_id])
        
        db.close();
        return response.affectedRows > 0 ? true : false
    } catch (error) {
        return false 
    }
}  


export async function disbaleRol_delete(idRol: number, idState: number): Promise<boolean> {
    try {
        await db.connect()
        const sql = `UPDATE rol set rol_sta_id = ${idState}  WHERE rol_id = ${idRol}`
        const response: any = await db.query(sql)
        return response.affectedRows > 0 ? true : false
    } catch (error) {
        return false
    }
}