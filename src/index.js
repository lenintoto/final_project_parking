import app from "./server.js";
import conexion from "./database.js";

app.listen(app.get("port"), ()=>{    
    console.log(`Servidor conectado en el puerto ${app.get("port")}`)
    console.log(`\nDocumentación funcionando en http://localhost:${app.get("port")}/api/v1/docs/`)
    
})

conexion()

