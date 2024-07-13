import Parqueaderos from "../models/parqueaderos.js"
import mongoose from "mongoose"

const registrarParqueadero = async(req,res)=>{
    const {numero, bloque} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos, debe llenar todos los campos"})
    const numBloqueEstacionamiento = await Parqueaderos.findOne({numero, bloque})
    if(numBloqueEstacionamiento) return res.status(400).json({
        msg: "Lo sentimos, este parqueadero ya esta registrado"})
        
    const nuevoParqueadero = new Parqueaderos(req.body)
    await nuevoParqueadero.save()
    res.status(200).json({msg: "Parqueadero registrado con exito"})
}

const listarParqueaderos = async(req,res)=>{
    const parqueaderos = await Parqueaderos.find({estado: true})
    res.status(200).json(parqueaderos)
}

const detalleParqueadero = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg: "El id que acaba de ingresar no existe"})
    const parqueadero = await Parqueaderos.findById(id)
    res.status(200).json(parqueadero)
}

const listarDisponibilidadParqueaderos = async(req,res)=>{
    const parqueaderosDisponibles = await Parqueaderos.find({disponibilidad: true})
    if(!parqueaderosDisponibles) return res.status(203).json({
        msg: "Lo sentimos, por el momento no hay parqueaderos disponibles"})
    res.status(200).json(parqueaderosDisponibles)
}


const actualizarParqueadero = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
        msg: "El id que acaba de ingresar no existe"})
    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos, debe llenar todos los campos"})
    const parqueadero = await Parqueaderos.findByIdAndUpdate(id, req.body)
    await parqueadero.save()
    res.status(200).json({msg: "Parqueadero actualizado con exito"})
}

const cambiarEstadoParqueadero = async(req,res)=>{
    const {id} = req.params
    const {estado} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
        msg: "El id que acaba de ingresar no existe"})
    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos, el campo no debe de estar vacio"
    })
    const parqueadero = await Parqueaderos.findByIdAndUpdate(id, {status: estado})
    await parqueadero.save()
    res.status(200).json({msg: "El estado del parqueadero ha sido actualizado con exito"})
}


export {
    registrarParqueadero, 
    listarParqueaderos, 
    detalleParqueadero, 
    listarDisponibilidadParqueaderos, 
    actualizarParqueadero, 
    cambiarEstadoParqueadero
}