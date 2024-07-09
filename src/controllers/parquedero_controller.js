//import Parqueaderos from "../models/parqueaderos.js"


const registrarParqueadero = (req,res)=>{
    res.status(200).json({res: "registrar parqueadero"})
}

const listarParqueaderos = (req,res)=>{
    res.status(200).json({res:"listar parqueaderos"})
    
}
const detalleParqueadero = (req,res)=>{
    res.status(200).json({res: "detalle parqueadero"})
    
}

const listarDisponibilidadParqueaderos = (req,res)=>{
    res.status(200).json({res:"listar disponibilidad de parqueaderos"})
    
}

const actualizarParqueadero = (req,res)=>{
    res.status(200).json({res:"actualizar parqueadero"})
    
}
const eliminarParqueadero = (req,res)=>{
    res.status(200).json({res:"eliminar parqueadero"})
    
}


export {
    registrarParqueadero, 
    listarParqueaderos, 
    detalleParqueadero, 
    listarDisponibilidadParqueaderos, 
    actualizarParqueadero, 
    eliminarParqueadero
}