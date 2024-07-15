import administrador from "../models/administrador.js";
import guardias from "../models/guardias.js";
import parqueaderos from "../models/parqueaderos.js";
import usuarios from "../models/usuarios.js";
import mongoose from "mongoose"
import generarJWT from "../helpers/crearJWT.js"
//login
const loginAdmin = async (req,res)=>{
    const {email, password} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })
    const adminInformacion = await administrador.findOne({email}).select("-status -createdAt -updatedAt -__v -token")
    if(!adminInformacion) return res.status(404).json({
        msg: "Lo siento el usuario no se encuentra registrado"
    })
    const confirmarPasword = await adminInformacion.matchPassword(password)
    if(!confirmarPasword) return res.status(404).json({
        msg: "Lo sentimos la contraseña es incorrecta"
    })
    const token = generarJWT(adminInformacion._id, "administrador")
    const {nombre, apellido, telefono, _id} = adminInformacion
    res.status(200).json({
        nombre, 
        apellido, 
        telefono, 
        token, 
        _id, 
        email: adminInformacion.email})
}

//registro 
const registroAdmin = async (req,res)=>{
    const {email, password} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })
    const emailEncontrado = await administrador.findOne({email})
    if(emailEncontrado) return res.status(400).json({
        msg: "Lo sentimos este email, ya se encuentra registrado"
    })
    const nuevoUsuarioAdmin =  new administrador(req.body)
    nuevoUsuarioAdmin.password = await nuevoUsuarioAdmin.encrypPassword(password)
    await nuevoUsuarioAdmin.save()
    res.status(200).json({msg: "Usurio creado"}) 
    
}

//Listar usuarios 
const ListarUsuarios = async (req,res)=>{
    const usuario = await usuarios.find()
    res.status(200).json(usuario)

    //const token = usuario.createToken()

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
    const guardia = await guardias.find()
    res.status(200).json(guardia)
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
    EliminarUsuarios,
    cambiarEstadoGuardia,
    listarDisponibilidadParqueaderosAdmin,
    ListarUsuarios,
    ListarGuardias
}