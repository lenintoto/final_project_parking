import express from "express"
import dotenv from "dotenv"
import cors from "cors"

//Inicializaciones
const app = express()
dotenv.config()

//Configuraciones
app.set("port", process.env.port || 3000)
app.use(cors)

//Middlewares


//Rutas


export default app