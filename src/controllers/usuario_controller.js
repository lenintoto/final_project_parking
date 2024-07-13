import Usuarios from "../models/usuarios.js"

const loginUsuario = async(req, res)=>{
    const {email, password} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })
    const usuarioInformacion = await Usuarios.findOne({email}).select("-status -createdAt -updatedAt -__v -token")
    if(!usuarioInformacion) return res.status(400).json({
        msg: "Lo siento el usuario no se encuentra registrado"
    })
    if(usuarioInformacion?.confirmEmail === false) return res.status(400).json({
        msg: "Lo siento debe primero verificar su cuenta"
    })
    const confirmarPasword = await usuarioInformacion.matchPassword(password)
    if(!confirmarPasword) return res.status(400).json({
        msg: "Lo sentimos la contraseña es incorrecta"
    })
    res.status(200).json(usuarioInformacion)
}


const registrarUsuario = async(req, res)=>{
    const {email, password} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })
    const emailEncontrado = await Usuarios.findOne({email})
    if(emailEncontrado) return res.status(400).json({
        msg: "Lo sentimos este email, ya se encuentra registrado"
    }) 
    const nuevoUsuario =  new Usuarios(req.body)
    nuevoUsuario.password = await nuevoUsuario.encrypPassword(password)
    nuevoUsuario.createToken()
    await nuevoUsuario.save()
    res.status(200).json({msg: "Usuario registrado con exito"})
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
    res.status(200).json({msg: "Actualizar perfil"})
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