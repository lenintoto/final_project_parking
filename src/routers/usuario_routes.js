import { Router } from "express"
import { actualizarContraseña, 
    actualizarPerfil, 
    comprobarTokenContraseña, 
    confirmarEmail, 
    loginUsuario, 
    nuevaContraseña, 
    perfilUsuario, 
    recuperarContraseña, 
    registrarUsuario } from "../controllers/usuario_controller.js"
import verificarRol from "../middlewares/autenticacion.js"


const router = Router()

router.post("/usuarios/login", loginUsuario)
router.post("/usuarios/registrar", registrarUsuario)
router.get("/usuarios/confirmar-email/:token", confirmarEmail)
router.post("/usuarios/recuperar-password", recuperarContraseña)
router.get("/usuarios/recuperar-password/:token" ,comprobarTokenContraseña)
router.post("/usuarios/nueva-password/:token", nuevaContraseña)


router.get("/usuarios/perfil", verificarRol,perfilUsuario)
router.put("/usuarios/actualizar-password", verificarRol,actualizarContraseña)
router.put("/usuarios/:id",verificarRol, actualizarPerfil)


export default router