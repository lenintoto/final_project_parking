import { enviarParqueaderosUsuarios } from "../config/nodemailer.js"
import generarJWT from "../helpers/crearJWT.js"
import Guardias from "../models/guardias.js"
import Parqueaderos from "../models/parqueaderos.js"
import Usuarios from "../models/usuarios.js"
import mongoose from "mongoose"


const login = async(req, res) =>{
    const {email, password} = req.body
    if(Object.values(req.body).includes("")) return res.status(404).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })
    const guardiaInfo = await Guardias.findOne({email})
    if(!guardiaInfo) return res.status(404).json({
        msg: "Lo sentimos ese email no se encuentra registrado"
    })
    const confirmarPass = await guardiaInfo.matchPassword(password)
    if(!confirmarPass) return res.status(404).json({
        msg: "Lo sentimos contraseña incorrecta "
    })
    const token = generarJWT(guardiaInfo._id, "guardia")
    const {nombre, apellido, telefono, _id} = guardiaInfo

    await guardiaInfo.save()
    res.status(200).json({
        _id, 
        token, 
        nombre, 
        apellido, 
        telefono,
        email: guardiaInfo.email})
}

const perfil = (req, res) =>{
    delete req.guardia.createdAt
    delete req.guardia.updatedAt
    delete req.guardia.__v

    res.status(200).json(req.guardia)
}


const verParqueaderosDisponibles = async(req, res) =>{
    const parqueaderos = await Parqueaderos.find({estado: true})
    if(!parqueaderos) return res.status(203).json({
        msg: "Lo sentimos, por el momento no hay parqueaderos disponibles"})
    res.status(200).json(parqueaderos)
}

const enviarParqueaderosAUsuarios = async(req, res) =>{

    const {email, placa_vehiculo} = req.body
    if(Object.values(req.body).includes("")) return res.status(404).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })

    const usuario = await Usuarios.findOne({email, placa_vehiculo})
    if(!usuario) return res.status(404).json({
        msg: "Lo sentimos pero el usuario que acaba de ingresar no se encuentra registrado"})

    const parqueaderos = await Parqueaderos.find({estado: true})
    if(!parqueaderos) return res.status(203).json({
        msg: "Lo sentimos, por el momento no hay parqueaderos disponibles"})

    
    //Funcion para enviar los parqueaderos al usuario
    await enviarParqueaderosUsuarios(usuario.email, parqueaderos)

    res.status(200).json({msg: "Parqueaderos disponibles enviados al usuario"})
}

const actualizarPerfil = async(req, res) =>{
    const {id} = req.params
    if(Object.values(req.body).includes("")) return res.status(404).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({
        msg: "Lo sentimos pero ese guardia no se encuentra registrado"
    })


    const guardiaActualizado = await Guardias.findByIdAndUpdate(id,req.body)
    await guardiaActualizado.save()

    res.status(200).json({msg: "Perfil guardia actualizado"})
}



export{login, 
    perfil, 
    verParqueaderosDisponibles, 
    enviarParqueaderosAUsuarios, 
    actualizarPerfil}