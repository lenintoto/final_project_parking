import app from "./server.js";
import conexion from "./database.js";

app.listen(app.get("port"), ()=>{    
    console.log(`Servidor conectado en el puerto ${app.get("port")}`)
})

conexion()

