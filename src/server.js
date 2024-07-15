import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import routerParqueaderos from "./routers/parqueadero_routes.js"
import routerUsuarios from "./routers/usuario_routes.js"
import routerGuardias from "./routers/guardia_routes.js"
import routerAdministrador from "./routers/administrador_routes.js"

//Inicializaciones
const app = express()
dotenv.config()

//Configuraciones
app.set("port", process.env.port || 3000)
app.use(cors())


//Middlewares
app.use(express.json())


//Rutas
app.use("/api", routerParqueaderos)
app.use("/api", routerUsuarios)
app.use("/api", routerGuardias)
app.use("/api", routerAdministrador)


//Endpoint no es encontrado
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404")) 

export default app