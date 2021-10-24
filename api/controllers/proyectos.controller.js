const express = require('express')
const router = express.Router()

const PostgresService = require('../services/postgres.service')
const _pg = new PostgresService()

/**
 * Crear un proyecto en base de datos
 * @param {Object} proyecto Proyecto a guardar `{codigo, nombre, descripcion, estado}`
 * @returns Informacion de la ejecucion en base de datos
 */
const crearProyecto = async (proyecto) => {
    const sql = 'INSERT INTO public.proyectos (codigo, nombre, descripcion, estado)   VALUES($1, $2, $3, $4);'
    const datos = [proyecto.codigo, proyecto.nombre, proyecto.descripcion, proyecto.estado]
    return await _pg.ejecutarQuery(sql,datos)
}

/**
 * Consultar  los proyectos de la base de datos
 */
const consultarProyecto = async (codigo) => {
    let sql = 'SELECT codigo, nombre, descripcion, estado FROM proyectos'
    if (codigo){
        sql += ` WHERE codigo = $1`
        const datos = [codigo]
        return await _pg.ejecutarQuery(sql,datos)
    }
    return await _pg.ejecutarQuery(sql)
}

/**
 * Eliminar proyecto de base de datos
 * @param {String} codigo Codigo del proyecto
 * @returns Informacion de la ejecucion en base de datos
 */
const eliminarProyecto = async (codigo) => {
    const sql = 'DELETE FROM public.proyectos WHERE codigo = $1'
    const datos = [codigo]
    return await _pg.ejecutarQuery(sql, datos)
}

/**
 * Actualizar los proyectos de la base de datos
 */
const actualizarProyecto = async (proyecto) => {
    const sql = 'UPDATE public.proyectos SET nombre=$1, descripcion=$2, estado=$3 WHERE codigo=$4'
    const datos = [proyecto.nombre, proyecto.descripcion, proyecto.estado, proyecto.codigo]
    return await _pg.ejecutarQuery(sql, datos)
}

module.exports = {crearProyecto, consultarProyecto, eliminarProyecto, actualizarProyecto}