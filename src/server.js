import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./routers/parqueadero_routes.js"

//Inicializaciones
const app = express()
dotenv.config()

//Configuraciones
app.set("port", process.env.port || 3000)
app.use(cors())

//Middlewares


//Rutas
app.use("/api", router)

//Endpoint no es encontrado
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404")) 

export default app