// Importando el framework
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

// Inicializar el express
const app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload());

/* app.use((req,res,next)=>{
  console.log(req.url)
  next()
}) */

// *****IMPORTAR RUTAS PRIVADAS*************
const router_categorias =  require('./routers/categorias.router');
app.use(router_categorias)
const router_usuarios = require('./routers/usuarios.router');
app.use(router_usuarios)



// *****IMPORTAR RUTAS PUBLICAS*************
// IMPORTAR RUTAS CATEGORIAS
const router_public_categorias =  require('./routers/categorias.public.router');
app.use(router_public_categorias)

const router_public_usuario =  require('./routers/usuarios.public.router');
app.use(router_public_usuario)

//app.use("/files",express.static('./temp'));


//*********** MIDDLEWARE JWT */
const auth_middleware = require('./controllers/auth.middleware');
app.use('/', auth_middleware.validarTokenMiddleware)


// IMPORTAR RUTAS RESERVAS
const router_reservas = require('./routers/reservas.router');
app.use(router_reservas)



// IMPORTAR RUTAS PROYECTOS
const router_proyecto = require('./routers/proyectos.router');
app.use(router_proyecto)

/* const router_archivos =  require('./routers/archivos.router');
app.use(router_archivos) */

app.use('/', (req, res)=>{
  let info={ok:false, message:'404 not found', info:null}
  res.status(404).send(info)
})

// Definir un puerto, donde se ejecuta el api
const port = 3001


// Iniciar el api
app.listen(port, () => {
  console.log(`API: http://localhost:${port}`)
})