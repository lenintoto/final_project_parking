import { Router } from "express"
import { actualizarParqueadero,
    detalleParqueadero,
    cambiarEstadoParqueadero,
    listarDisponibilidadParqueaderos,
    listarParqueaderos,
    registrarParqueadero } from "../controllers/parquedero_controller.js"

const router = Router()

router.post("/parqueaderos/registrar", registrarParqueadero)
router.get("/parqueaderos/disponibilidad", listarDisponibilidadParqueaderos)
router.get("/parqueaderos", listarParqueaderos)
router.get("/parqueaderos/:id", detalleParqueadero)
router.put("/parqueaderos/:id", actualizarParqueadero)
router.patch("/parqueaderos/:id", cambiarEstadoParqueadero)


export default router