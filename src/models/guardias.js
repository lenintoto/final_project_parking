import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const guardiasSchema = new mongoose.Schema({
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
    correo: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    telefono: {
        type: Number,
        default: null
    },
    turno: {
        type: String, 
        trim: true
    },
    estado: {
        type: Boolean, 
        default: true
    },
    id_parqueadero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parqueadero"
    }
},{
    timestamps: true
})



guardiasSchema.methods.encrypPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password, salt)
    return passwordEncryp
}

guardiasSchema.methods.matchPassword = async function (password) {
    const response = await bcrypt.compare(password, this.password)
    return response
}



export default mongoose.model("Guardias", guardiasSchema)
