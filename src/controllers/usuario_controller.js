import Usuarios from "../models/usuarios.js"

const loginUsuario = (req, res)=>{
    res.status(200).json({msg: "Login de usuario"})
}

const registrarUsuario = (req, res)=>{
    res.status(200).json({msg: "Registrar usuario"})
}

const confirmarEmail = (req, res)=>{
    res.status(200).json({msg: "Confirmar Email"})
}

const perfilUsuario = (req, res)=>{
    res.status(200).json({msg: "Perfil de usuario"})
}

const recuperarContraseña = (req, res)=>{
    res.status(200).json({msg: "Recuperar contraseña"})
}

const nuevaContraseña = (req, res)=>{
    res.status(200).json({msg: "Nueva contraseña"})
}

const actualizarContraseña   = (req,res)=>{
    res.status(200).json({msg: "Actualizar contraseña"})
}

const actualizarPerfil = (req, res)=>{
    res.status(200).json({msg: "Actualizar usuario"})
}


export{
    loginUsuario,
    registrarUsuario,
    perfilUsuario,
    recuperarContraseña,
    nuevaContraseña,
    actualizarContraseña,
    actualizarPerfil,
    confirmarEmail
}