import mongoose from "mongoose"

const parqueaderoSchema = new mongoose.Schema({
    numero_estacionamiento: {type: Number, require: true},
    bloque_estacionamiento : {type: String, require: true},
    tipo: {type: String, require: true},
    disponibilidad: {type: Boolean, require: true},
    dimensiones: {type: String, require: true},
    reservado: {type: Boolean, require: true}
},{
    timestamps:true
})


export default mongoose.model("Parqueadero", parqueaderoSchema)