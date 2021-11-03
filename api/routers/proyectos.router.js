const express = require('express');
const router = express.Router()

const controller = require('../controllers/proyectos.controller')

//CREAR PROYECTO

router.post('/proyectos', async (req,res) =>{
    let proyecto = req.body
    try {
        let respuesta_db = await controller.crearProyecto(proyecto)
        let info = respuesta_db.rowCount == 1 ? `Proyecto creado: ${proyecto.codigo}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Proyecto creado correctamente' : 'No se creo el proyecto.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        let codigo_pg = error.code
        if (codigo_pg == '23505') {
            return res.status(400).send({ ok: false, message: `El proyecto (${proyecto.nombre}) ya esta creado.`, info: null })
        } else {
            console.log(error);
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
        }
    }    
}) 

//MODIFICAR PROYECTO 

router.put('/proyectos', async (req, res)=>{
    let proyecto = req.body
    try{
        let respuesta_db = await controller.actualizarProyecto(proyecto)
        let info = respuesta_db.rowCount == 1? `Proyecto actualizado: ${proyecto.codigo}` : ''
        let message = respuesta_db.rowCount == 1? 'Proyecto actualizado' : 'No se actualizó el proyecto'
        return res.send({ok: respuesta_db.rowCount == 1, message, info})
    } catch(error){
        console.log(error)
        return res.status(500).send({ok: false, message: 'Error no controlado', info: null})
    }
    
})

// ELIMINAR PROYECTO 

router.delete('/proyectos/:codigo', async (req, res)=>{
    try{
        let codigo = req.params.codigo
        let respuesta_db = await controller.eliminarProyecto(codigo)
        let info = respuesta_db.rowCount == 1? `Proyecto elimiando: ${codigo}` : ''
        let message = respuesta_db.rowCount == 1? 'Proyecto eliminado' : 'No se eliminó el proyecto'
        return res.send({ok: respuesta_db.rowCount == 1, message, info})
    }catch(error){
        return res.status(500).send({ok: false, message: 'Error no controlado', info: null})
    }
    
})

// CONSULTAR PROYECTO 

router.get('/proyectos/:codigo?', (req, res)=>{
    let codigo = req.params.codigo
    controller.consultarProyecto(codigo).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ok:true, message:'Proyectos consultados', info})
    }).catch(error=>{
        console.log(error);
        return res.status(500).send({ok: false, message: 'Error no controlado', info: null})
    })
    
})
module.exports = router
