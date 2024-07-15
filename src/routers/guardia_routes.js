import { Router } from "express";
import { actualizarPerfil, 
    enviarParqueaderosAUsuarios, 
    login, 
    perfil, 
    verParqueaderosDisponibles } from "../controllers/guardia_controller.js"
import verificarRol from "../middlewares/autenticacion.js";

const router = Router()



router.post("/guardias/login", login)
router.get("/guardias/perfil", verificarRol,perfil)
router.get("/guardias/parqueaderos-disponibles", verificarRol,verParqueaderosDisponibles)
router.post("/guardias/enviar-parqueaderos-disponibles", verificarRol,enviarParqueaderosAUsuarios)
router.put("/guardias/actualizar-perfil/:id", verificarRol, actualizarPerfil)




export default router
