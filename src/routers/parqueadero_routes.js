import { Router } from "express"
import { actualizarParqueadero,
    detalleParqueadero,
    cambiarEstadoParqueadero,
    listarDisponibilidadParqueaderos,
    listarParqueaderos,
    registrarParqueadero } from "../controllers/parquedero_controller.js"

import verificarAdmin from "../middlewares/autenticacionAdmin.js"

const router = Router()

router.post("/parqueaderos/registrar", verificarAdmin, registrarParqueadero)
router.get("/parqueaderos/disponibilidad", verificarAdmin,listarDisponibilidadParqueaderos)
router.get("/parqueaderos", verificarAdmin,listarParqueaderos)
router.get("/parqueaderos/:id",verificarAdmin, detalleParqueadero)
router.put("/parqueaderos/:id",verificarAdmin, actualizarParqueadero)
router.patch("/parqueaderos/:id",verificarAdmin, cambiarEstadoParqueadero)


export default router