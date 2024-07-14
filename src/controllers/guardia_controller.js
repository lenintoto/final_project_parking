import Guardias from "../models/guardias.js"

const login = (req, res) =>{
    res.status(200).json({msg: "login guardia"})
}

const perfil = (req, res) =>{
    res.status(200).json({msg: "perfil guardia"})

}

const verParqueaderosDisponibles = (req, res) =>{
    res.status(200).json({msg: "parqueadero disponible guardia"})

}

const enviarParqueaderosAUsuarios = (req, res) =>{
    res.status(200).json({msg: "enviar parqueadero a usuario"})

}

const actualizarPerfil = (req, res) =>{
    res.status(200).json({msg: "actualizar guardia"})

}



export{login, 
    perfil, 
    verParqueaderosDisponibles, 
    enviarParqueaderosAUsuarios, 
    actualizarPerfil}