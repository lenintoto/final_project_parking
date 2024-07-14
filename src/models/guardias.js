import mongoose from "mongoose"


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
    }
},{
    timestamps: true
})


export default mongoose.model("Guardias", guardiasSchema)
