import { Router } from "express"
import { actualizarContraseña, 
    actualizarPerfil, 
    confirmarEmail, 
    loginUsuario, 
    nuevaContraseña, 
    perfilUsuario, 
    recuperarContraseña, 
    registrarUsuario } from "../controllers/usuario_controller.js"

const router = Router()

router.post("/usuarios/login", loginUsuario)
router.post("/usuarios/registrar", registrarUsuario)
router.get("/usuarios/confirmar-email/:token", confirmarEmail)
router.get("/usuarios/perfil", perfilUsuario)
router.get("/usuarios/recuperar-password", recuperarContraseña)
router.post("/usuarios/nueva-password", nuevaContraseña)
router.put("/usuarios/actualizar-password", actualizarContraseña)
router.put("/usuarios/:id", actualizarPerfil)


export default router