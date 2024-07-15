import { enviarCorreoUsuario, enviarRestablecimientoContraseña } from "../config/nodemailer.js"
import Usuarios from "../models/usuarios.js"
import mongoose from "mongoose"
import generarJWT from "../helpers/crearJWT.js"

const loginUsuario = async(req, res)=>{
    const {email, password} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })
    const usuarioInformacion = await Usuarios.findOne({email}).select("-estado -createdAt -updatedAt -__v -token")
    if(!usuarioInformacion) return res.status(404).json({
        msg: "Lo siento el usuario no se encuentra registrado"
    })
    if(usuarioInformacion?.confirmEmail === false) return res.status(403).json({
        msg: "Lo siento debe primero verificar su cuenta"
    })
    const confirmarPasword = await usuarioInformacion.matchPassword(password)
    if(!confirmarPasword) return res.status(404).json({
        msg: "Lo sentimos la contraseña es incorrecta"
    })
    const token = generarJWT(usuarioInformacion._id, "usuario")
    const {nombre, apellido, telefono, _id} = usuarioInformacion
    res.status(200).json({
        nombre, 
        apellido, 
        telefono, 
        token, 
        _id, 
        email: usuarioInformacion.email})
}


const registrarUsuario = async(req, res)=>{
    const {email, password, placa_vehiculo} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })
    const emailEncontrado = await Usuarios.findOne({email})
    if(emailEncontrado) return res.status(400).json({
        msg: "Lo sentimos este email, ya se encuentra registrado"
    }) 
    const vehiculoEncontrado = await Usuarios.findOne({placa_vehiculo})
    if(vehiculoEncontrado) return res.status(400).json({
        msg: "Lo sentimos ese vehiculo, ya se encuentra registrado"
    })

    const nuevoUsuario =  new Usuarios(req.body)
    nuevoUsuario.password = await nuevoUsuario.encrypPassword(password)
    
    const token =  nuevoUsuario.createToken()
    await enviarCorreoUsuario(email, token)
    await nuevoUsuario.save()
    res.status(200).json({msg: "Revisa tu correo para verificar tu cuenta"})
}

const confirmarEmail = async(req, res)=>{    
    if(!(req.params.token)) return res.status(400).json({
        msg:"Lo sentimos no hemos podido verificar su cuenta"})
    const usuario = await Usuarios.findOne({token: req.params.token})
    if(!usuario?.token) return res.status(404).json({
        msg: "La cuenta ya ha sido verificada"
    })
    usuario.token = null
    usuario.confirmEmail = true
    await usuario.save()
    res.status(200).json({msg: "Token confirmado, ya puedes iniciar sesión"})
}


const perfilUsuario = (req, res)=>{
    delete req.usuario.token
    delete req.usuario.confirmEmail
    delete req.usuario.createdAt
    delete req.usuario.updatedAt
    delete req.usuario.__v
    res.status(200).json(req.usuario)
}



const nuevaContraseña = async(req, res)=>{
    const {password, confirmarPassword} = req.body
    if(Object.values(req.body).includes("")) return res.status(404).json({
        msg: "Lo sentimos, debe llenar todos los campos"
    })
    if(password !== confirmarPassword) return res.status(404).json({
        msg: "Lo sentimos, las contraseñas no coinciden"})
    const usuario = await Usuarios.findOne({token: req.params.token})
    if(usuario.token !== req.params.token) return res.status(404).json({
        msg:"Lo sentimos no hemos podido verificar su cuenta"})
    usuario.token = null
    usuario.password = await usuario.encrypPassword(password)
    await usuario.save()
            
    res.status(200).json({msg: "Contraseña actualizada con exito"})
}

const recuperarContraseña = async(req, res)=>{
    const {email} = req.body
    if(Object.values(req.body).includes("")) return res.status(404).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })
    const usuario = await Usuarios.findOne({email})
    if(!usuario) return res.status(404).json({
        msg: "Lo sentimos pero el email que acabe de ingresar no esta registrado"
    })
    //funcion para enviar al correo el msj de restablecer contraseña
    const token = await usuario.createToken()
    usuario.token = token
    await enviarRestablecimientoContraseña(email, token)
    await usuario.save()
    res.status(200).json({msg: "Revise su correo electrónico para reestablecer su contraseña"})
}


const comprobarTokenContraseña = async(req, res) =>{
    if(!req.params.token) return res.status(400).json({msg: "Lo siento no se pueda validar la cuenta"})
    const usuario = await Usuarios.findOne({token: req.params.token})
    if(usuario?.token !== req.params.token) return res.status(400).json({
        msg: "Lo sentimos no se pueda validar la cuenta"
    })
    await usuario.save()
    res.status(200).json({msg: "Token confirmado, ya puedes crear tu nuevo password"})
}

const actualizarContraseña   = async(req,res)=>{
    if(Object.values(req.body).includes("")) return res.status(404).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })
    const usuario = await Usuarios.findById(req.usuario._id)
    if(!usuario) return res.status(404).json({
        msg: `Lo sentimos, no existe el usuario ${id}`
    })
    const verificarContraseña = await usuario.matchPassword(req.body.actualPassword)
    if(!verificarContraseña) return res.status(404).json({
        msg: "Lo sentimos, la contraseña actual no es correcta"
    })
    usuario.password = await usuario.encrypPassword(req.body.nuevoPassword)
    await usuario.save()
    res.status(200).json({msg: "Contraseña actualizada con exito"})

}

const actualizarPerfil = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
        msg: "El id que acaba de ingresar no existe"
    })
    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos, debes llenar todos los campos"
    })
    const usuario = await Usuarios.findByIdAndUpdate(id, req.body)
    await usuario.save()
    res.status(200).json({msg: "Perfil actualizado"})
}


export{
    loginUsuario,
    registrarUsuario,
    perfilUsuario,
    recuperarContraseña,
    nuevaContraseña,
    actualizarContraseña,
    actualizarPerfil,
    confirmarEmail,
    comprobarTokenContraseña
}