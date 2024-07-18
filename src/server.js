import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerParqueaderos from "./routes/parqueadero_routes.js";
import routerUsuarios from "./routes/usuario_routes.js";
import routerGuardias from "./routes/guardia_routes.js";
import routerAdministrador from "./routes/administrador_routes.js";
import swaggerUi from "swagger-ui-express"; // Importar swaggerUi
import swaggerJsDoc from "swagger-jsdoc"; // Importar swaggerSpec desde swagger.js
import { options } from "./swaggerOptions.js";

//Inicializaciones
const app = express();
dotenv.config();

//Configuraciones
app.set("port", process.env.port || 3000);
app.use(cors());

//Middlewares
app.use(express.json());
const spect = swaggerJsDoc(options);

//Rutas
app.use("/api", routerParqueaderos);
app.use("/api", routerUsuarios);
app.use("/api", routerGuardias);
app.use("/api", routerAdministrador);

//Documentacion
app.use("/", swaggerUi.serve, swaggerUi.setup(spect));

//Endpoint no es encontrado
app.use((req, res) => res.status(404).send("Endpoint no encontrado - 404"));

export default app;
