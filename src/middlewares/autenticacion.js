import jwt from "jsonwebtoken"
import Usuarios from "../models/usuarios.js"
import administrador from "../models/administrador.js"

const autenticar = async(req, res, next)=>{

    const token = req.headers.authorization
    if(!token) return res.status(404).json({
        msg: "Lo sentimos primero debe proporcionar un token"
    })

    const {authorization} = req.headers

    try {
        const {id, rol} = jwt.verify(authorization.split(" ")[1], process.env.JWT_SECRET)
        if(rol === "usuario"){
            req.usuario = await Usuarios.findById(id).lean().select("-password")
            next()
        }
        else{
            req.admin = await administrador.findById(id).lean().select("-password")
            next()
        }

    } catch (error) {
        const e = new Error("Formato del token no válido")
        return res.status(404).json({msg: e.message})
    }
}

export default autenticar