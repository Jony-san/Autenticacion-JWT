import express from 'express';
import cors from "cors";
import Cognito from "./routes/cognito.js"
import { authMiddleware } from './controllers/cognito.js';
import dotenv from "dotenv";

dotenv.config();

//Definir politicas de acceso
const corsOptions = {
  origin: ["http://postman.com"], // Indica el dominio permitido para solicitar recursos
  methods: ['GET', 'PUT', 'POST', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'user-agent'], // Cabeceras permitidas
  credentials: true // Permite enviar cookies en las solicitudes
};

//Definir puerto de inicio
const port = process.env.port;
//inicializar instancia de servidor
const app = express();

//Aceptar formato json
app.use(express.json({ limit: '1mb' }));

//Definir rutas
app.use("/Cognito", Cognito);

//Ruta de prueba para acceso via cognito
app.get("/access-Cognito", authMiddleware, (req, res) => {
  res.json({ 
    user: (req as any).user
  });
})
app.get("/", (req, res) => {
  console.log("respuesta recibida", req);
  
  res.json({ 
    message: "ok"
  });
})
//Usar politicas Cors
app.use(cors(corsOptions))
app.use(express.json())

  
//usar puerto
app.listen(port, () =>{
    console.log(`escuchando en puerto ${port}`);
})
