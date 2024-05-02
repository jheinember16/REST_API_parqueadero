import express from 'express'
import dotenv from 'dotenv'
import usuarioRoutes from './routes/UsuarioRutas.js'
import parqueaderoRoutes from './routes/ParqueaderoRutas.js'
import authRutas from './routes/AuthRutas.js'
import rolesRutas from './routes/RolesRutas.js'
import vehiculosRutas from './routes/vehiculoRutas.js'

import { sequelize } from './config/db.js'
import { createRoles } from './libs/initialSetup.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use('/', usuarioRoutes)
app.use('/', parqueaderoRoutes)
app.use('/', authRutas)
app.use('/', rolesRutas)
app.use('/', vehiculosRutas)



sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Conexión exitosa.')
    createRoles()
  })
  .catch(err => {
    console.error('Error al sincronizar modelos con la base de datos:', err)
  })

  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
  })




