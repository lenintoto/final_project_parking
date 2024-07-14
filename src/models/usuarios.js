import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const usuariosSchema = new mongoose.Schema({
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
        type: String, 
        require: true,
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
        require: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: null
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    telefono: {
        type: Number,
        default: null,
        trim: true
    },
    placa_vehiculo: {
        type: String,
        require: true,
        unique: true
    },
    id_parqueadero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parqueadero"
    }
}, {
    timestamps: true
})


usuariosSchema.methods.encrypPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password, salt)
    return passwordEncryp
}

usuariosSchema.methods.matchPassword = async function (password) {
    const response = await bcrypt.compare(password, this.password)
    return response
}

//Metodo para crear un token
usuariosSchema.methods.createToken = function () {
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

export default mongoose.model("Usuarios", usuariosSchema)