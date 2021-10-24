const { creartoken } = require('../services/jwt.service')
const PostgresService = require('../services/postgres.service')
const _pg = new PostgresService()




/**
 * Crear una categoria en base de datos
 * @param {Object} categoria categoria a guardar `{nombre, id}`
 * @returns Informacion de la ejecucion en base de datos
 */
 const crearCategoria = async (categoria) => {
    const sql = 'INSERT INTO public.categorias (nombre, id) VALUES($1,$2);'
    const datos = [categoria.nombre, categoria.id]


    return await _pg.ejecutarQuery(sql, datos)
}

/**
 * Consultar las categorias de la base de datos
 */
const consultarCategoria = async(id) => {
    let sql = 'SELECT nombre, id  FROM categorias'
    if (id) {
        sql += ` WHERE id = $1`
        const datos = [id]
        return await _pg.ejecutarQuery(sql , datos )
    } else {
        return await _pg.ejecutarQuery(sql)
    }
}

/**
 * Eliminar una categoria de base de datos
 * @param {String} id Id de la categoria
 * @returns Informacion de la ejecucion en base de datos
 */
const eliminarCategoria =async (id) => {
    const sql = 'DELETE FROM public.categorias WHERE id=$1';
    const datos = [id]
    return await _pg.ejecutarQuery(sql, datos)
}

const modificarCategoria = async(categoria) => {
    const sql = `UPDATE public.categorias SET nombre=$1 WHERE id=$2;`
    const datos = [categoria.nombre,  categoria.id]
    return await _pg.ejecutarQuery(sql, datos)

}

module.exports = { modificarCategoria, eliminarCategoria, consultarCategoria, crearCategoria }