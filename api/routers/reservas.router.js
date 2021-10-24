const express = require('express');
const router = express.Router()

const controller = require('../controllers/reservas.controller')

//CREAR RESERVA

router.post('/Reservas', async (req,res) =>{
    let reserva = req.body
    try {
        let respuesta_db = await controller.crearReserva(reserva)
        let info = respuesta_db.rowCount == 1 ? `Reserva creada: ${reserva.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'Reserva creada correctamente' : 'No se creo la reservas.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        let codigo_pg = error.code
        if (codigo_pg == '23505') {
            return res.status(400).send({ ok: false, message: `La reserva (${reserva.nombre}) ya esta creada.`, info: null })
        } else {
            console.log(error);
            return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: error })
        }
    }    
}) 

//MODIFICAR RESERVA

router.put('/Reservas', async (req, res)=>{
    let reserva = req.body
    try {  
        let respuesta_db = await controller.modificarReserva(reserva)
        let info = respuesta_db.rowCount == 1 ? `Reserva modificada: ${reserva.id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'reserva modificada correctamente':'No se modifico la reserva'
        return res.send({ok: respuesta_db.rowCount == 1, message, info})
    } catch (error) {
            console.log(error)
            return res.status(500).send({ok: false, message:'ha ocurrido un error', info:error})     
    }
})

// ELIMINAR RESERVA
 
router.delete('/Reservas/:id', async (req, res) => {
    try {
        let id = req.params.id
        let respuesta_db = await controller.eliminarReserva(id)
        let info = respuesta_db.rowCount == 1 ? `Usuario eliminado: ${id}` : ''
        let message = respuesta_db.rowCount == 1 ? 'reserva eliminado correctamente' : 'No se eliminado la reserva.'
        return res.send({ ok: respuesta_db.rowCount == 1, message, info })
    } catch (error) {
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    }

})

// CONSULTAR RESERVA

router.get('/Reservas/:id?', (req, res)=>{
    let id = req.params.id    
    controller.consultarReserva(id).then(respuesta_db=>{
        let info = respuesta_db.rows
        return res.send({ok:true, message:'reservas consultadas', info})
    }).catch(error => {
        console.log(error);
        return res.status(500).send({ok: false, message:'ha ocurrido un error', info:null})
    })
    
})

module.exports = router