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
router.get("/usuarios/recuperar-contraseña", recuperarContraseña)
router.post("/usuarios/nueva-contraseña", nuevaContraseña)
router.put("/usuarios/actualizar-contraseña", actualizarContraseña)
router.put("/usuarios/:id", actualizarPerfil)


export default router