import { Router } from "express";
import { actualizarPerfil, enviarParqueaderosAUsuarios, login, perfil, verParqueaderosDisponibles } from "../controllers/guardia_controller.js"

const router = Router()



router.post("/guardias/login", login)
router.get("/guardias/perfil", perfil)
router.get("/guardias/parqueaderos-disponibles", verParqueaderosDisponibles)
router.post("/guardias/enviar-parqueaderos-disponibles", enviarParqueaderosAUsuarios)
router.put("/guardias/actualizar-perfil", actualizarPerfil)





export default router
