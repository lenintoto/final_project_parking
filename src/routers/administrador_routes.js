import { Router } from "express";
import verificarRol from "../middlewares/autenticacion.js"
import { cambiarEstadoGuardia,
    EliminarUsuarios,
    listarDisponibilidadParqueaderosAdmin,
    ListarGuardias,
    ListarUsuarios, 
    loginAdmin,
    registroAdmin} from "../controllers/administrador_controller.js";
const router = Router()

router.post("/administrador/login",loginAdmin)
router.post("/administrador/registrar",registroAdmin)
router.get("/administrador",verificarRol,ListarUsuarios)
router.delete("/administrador/eliminar_usuario/:id",verificarRol,EliminarUsuarios)
router.get("/administrador/listar_guardias",verificarRol,ListarGuardias)
router.get("/administrador/cambiar_estado_guardia",verificarRol,cambiarEstadoGuardia)
router.get("/administrador/disponibilidad",verificarRol,listarDisponibilidadParqueaderosAdmin)
export  default router 
