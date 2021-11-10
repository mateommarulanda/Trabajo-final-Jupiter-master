const express = require('express');
const router = express.Router()

const controller = require('../controllers/categorias.controllers')
const { validarToken } = require('../services/jwt.service');

// CREAR CATEGORIA

router.post('/categorias', async (req, res) => {
    let categoria = req.body
    try {
        
        let respuesta_bd =await controller.crearCategoria(categoria)
        let info = respuesta_bd.rowCount == 1 ? `categoria creada: ${categoria.id}` : ''
        let message = respuesta_bd.rowCount == 1 ? `categoria creada correctamente` : 'no se creo la categoria'
        return res.send({ ok: respuesta_bd.rowCount == 1, message, info })
    } catch (error) {
        let codigo_pg = error.code
        if (codigo_pg == '23505') {
            return res.status(400).send({ ok: false, message: `la categoria (${categoria.id}) ya esta creada.`, info: null })
        } else {
            console.log(error);
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
        }
    }

})

// MODIFICAR CATEGORIA

router.put('/categorias', async(req, res) => {
    let categoria = req.body
    try {
        let respuesta_db = await controller.modificarCategoria(categoria)
        let info = respuesta_db.rowCount == 1 ? `categoria modificado: ${categoria.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'categoria modificada correctamente' : 'No se modifico la categoría.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
    }
})

// ELIMINAR CATEGORIA

router.delete('/categorias/:id', async (req, res) => {
    try {
        let id = req.params.id
        let respuesta_db = await controller.eliminarCategoria(id)
        let info = respuesta_db.rowCount == 1 ? `Categoria eliminado: ${id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Categoria eliminada correctamente' : 'No se eliminado la Categoria.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }
})

// CONSULTAR CATEGORIA


module.exports = router