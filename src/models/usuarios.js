import mongoose from "mongoose"


const usuariosSchema = new mongoose.Schema({
    nombre: {type: String, require: true, trim: true},
    apellido: {type: String, require: true, trim: true},
    email: {type: String, require: true, trim: true, unique: true},
    password: {type: String, require: true, trim: true},
    status: {type: Boolean, default: true},
    token: {type: String, default: null},
    confirmEmail: {type: Boolean, default: false },
    id_parqueadero: {type: Object, require: true},
    telefono: {type: Number, require: false},
    placa_vehiculo: {type: String, require: true, unique: true}
},{
    timestamps: true
})

export default mongoose.model("Usuarios", usuariosSchema)