import Administrador from "../models/administrador.js";
import guardias from "../models/guardias.js";
import parqueaderos from "../models/parqueaderos.js";
import usuarios from "../models/usuarios.js";
import mongoose from "mongoose"

//login
const loginAdmin = async (req,res)=>{

}
//registro 
const registroAdmin = async (req,res)=>{
    
}
//confirmar email
const confirmarEmailAdmin = async (req,res)=>{
    
}
//Listar usuarios 
const ListarUsuarios = async (req,res)=>{
    //const usuario = await usuarios.find();
    try {
        const usuario = await usuarios.find();
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener usuarios' });
    }


}
//Eliminar usuarios
const EliminarUsuarios = async(req,res)=>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) 
    return res.status(404).json({ msg: 'ID de usuario no válido' });
    const usuario=await usuarios.findByIdAndDelete(id);
    if (!usuario) return res.status(404).json({ msg: 'Usuario no encontrado' });
    res.status(200).json({ msg: 'Usuario eliminado' });
}

//Listar guardias 
const ListarGuardias = async (req,res)=>{
    const guardia = await guardias.find();

}

//cambiar estado de usuario del guardia 
const cambiarEstadoGuardia = async(req,res)=>{
    await guardias.findByIdAndUpdate(req.params.id,{estado:false})
    res.status(200).json({msg:"Estado del usuario modificado exitosamente"})
}

//Visualizar  la diponibilidad  de los parqueaderos
const listarDisponibilidadParqueaderosAdmin = async(req,res)=>{
    const parqueaderosDisponibles = await parqueaderos.find({disponibilidad: true})
    if(!parqueaderosDisponibles) return res.status(203).json({
        msg: "Lo sentimos, por el momento no hay parqueaderos disponibles"})
    res.status(200).json(parqueaderosDisponibles)
}

export{ 
    loginAdmin,
    registroAdmin,
    confirmarEmailAdmin,
    EliminarUsuarios,
    cambiarEstadoGuardia,
    listarDisponibilidadParqueaderosAdmin,
    ListarUsuarios,
    ListarGuardias
}