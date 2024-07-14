import mongoose from "mongoose"

const parqueaderoSchema = new mongoose.Schema({
    numero: {
        type: Number,
        require: true
    },
    bloque: {
        type: String,
        require: true
    },
    tipo: {
        type: String,
        require: true
    },
    disponibilidad: {
        type: Boolean,
        require: true
    },
    dimensiones: {
        type: String,
        require: true
    },
    reservado: {
        type: Boolean,
        require: false,
        default: false
    },
    estado: {
        type: Boolean,
        require: true,
        default: true
    }
}, {
    timestamps: true
})


export default mongoose.model("Parqueaderos", parqueaderoSchema)