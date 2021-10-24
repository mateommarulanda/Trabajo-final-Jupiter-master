// Importando el framework
const express = require('express')

// Inicializar el express
const app = express()

app.use(express.json())

/* app.use((req,res,next)=>{
  console.log(req.url)
  next()
}) */

// *****IMPORTAR RUTAS PRIVADAS*************
const router_categorias =  require('./routers/categorias.router');
app.use(router_categorias)


// *****IMPORTAR RUTAS PUBLICAS*************
// IMPORTAR RUTAS CATEGORIAS
const router_public_categorias =  require('./routers/categorias.public.router');
app.use(router_public_categorias)



// IMPORTAR RUTAS RESERVAS
const router_reservas = require('./routers/reservas.router');
app.use(router_reservas)
// IMPORTAR RUTAS USUARIOS
const router_usuarios = require('./routers/usuarios.router');
app.use(router_usuarios)


// IMPORTAR RUTAS PROYECTOS
const router_proyecto = require('./routers/proyectos.router');
app.use(router_proyecto)

// Definir un puerto, donde se ejecuta el api
const port = 3001


// Iniciar el api
app.listen(port, () => {
  console.log(`API: http://localhost:${port}`)
})