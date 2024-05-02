import express from "express";
import env from "env-var";
import { config } from "dotenv";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { fileURLToPath } from "url";
import rutas from "./router/rutas.js";
import errores from "./router/errores.js";
// (importante) Url de la carpeta padre (Lisette)
const __dirname = fileURLToPath(new URL(".", import.meta.url));
// estructura de la conexion
config(); // abre el archivo .env
const app = express(); //variable general (se va a usar siempre)
const PORT = env.get("puerto").required().asPortNumber(); //creacion del puerto
//aui van los middleware
app.use(morgan("dev")); //hace mas facil leer la unformacion de la consola (las peticiones de servidor, URL, status, tiempo, y peso del archivo)
app.use(helmet());
app.use(cors());
//conexion con vistas en formato EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// ruta a carpeta public
app.use(express.static(path.join(__dirname, "public")));
// obtener respuestas en json
app.use(express.json());
//para que la codifcacion del front al backend este correctamente
app.use(express.urlencoded({ extended: false }));
//aqui van las rutas o links o url de nuestra pagina y las extrae de la carpeta routers
app.get("/gato", rutas.gato);
// error 404 
app.use(errores.error_404);
// Servidor activo
app.listen(PORT, () => { console.log("servidor activo en el puerto " + PORT) });


