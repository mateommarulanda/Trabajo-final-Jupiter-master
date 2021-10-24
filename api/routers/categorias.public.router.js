const express = require('express');
const router = express.Router()

const controller = require('../controllers/categorias.controllers')
router.get('/categorias/:id?', (req, res) => {
    let id = req.params.id
    controller.consultarCategoria(id).then(respuesta_db => {
        let info = respuesta_db.rows
        return res.send({ ok: true, message: 'categoria consultada', info })
    }).catch(error => {
    
        console.log(error);
        return res.status(500).send({ ok: false, message: 'Ha ocurrido un error no controlado', info: null })
    })
    
})
module.exports = router