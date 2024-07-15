import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const adminSchema = new mongoose.Schema({
    nombre: {
        type: String, 
        require: true, 
        trim: true
    },
    apellido: {
        type: String,
        require: true,
        trim: true
    },
    cedula: {
        type:Number,
        require:true, 
        trim: true
    },
    email: {
        type: String,
        require: true, 
        trim: true, 
        unique: true
    },
    password: {
        type: String, 
        require: true,
        trim: true
    },
    token: {
        type: String, 
        default: null
    },
    telefono: {
        type: Number,
        require: false
    },
    permisos:[
        {Usuarios:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Usuarios'
        },
        Parqueadero:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Parqueadero'
        }}
    ]
},{
    timestamps: true
})

adminSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password, salt)
    return passwordEncryp
}

adminSchema.methods.matchPassword = async function(password){
    const response  = await bcrypt.compare(password, this.password)
    return response
}

//Metodo para crear un token
adminSchema.methods.createToken = async function(){
    const tokenGenerado = Math.random().toString(36).slice(2)
    return tokenGenerado
}

export default mongoose.model("Administrador", adminSchema)