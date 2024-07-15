import { Router } from "express";
import verificarRol from "../middlewares/autenticacion.js"
import { cambiarEstadoGuardia,
    EliminarUsuarios,
    listarDisponibilidadParqueaderosAdmin,
    ListarGuardias,
    ListarUsuarios, 
    loginAdmin,
    registroAdmin,
    registroGuardias} from "../controllers/administrador_controller.js";
const router = Router()

router.post("/administrador/login",loginAdmin)
router.post("/administrador/registrar",registroAdmin)
router.get("/administrador/listar-usuarios",verificarRol,ListarUsuarios)
router.delete("/administrador/eliminar_usuario/:id",verificarRol,EliminarUsuarios)
router.get("/administrador/listar-guardias",verificarRol,ListarGuardias)
router.patch("/administrador/cambiar-estado-guardia/:id",verificarRol,cambiarEstadoGuardia)
router.get("/administrador/disponibilidad-parqueadero",verificarRol,listarDisponibilidadParqueaderosAdmin)
router.post("/administrador/registrar-guardia",verificarRol,registroGuardias)

export  default router 