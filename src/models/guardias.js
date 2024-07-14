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
    confirmEmail: {
        type: Boolean,
        default: false
    },
    id_parqueadero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parqueadero"
    }

},{
    timestamps: true
})


export default mongoose.model("Guardias", guardiasSchema)
