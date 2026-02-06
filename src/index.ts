import express from 'express';
import cors from "cors";

const corsOptions = {
  origin: ["http://postman.com"], // Indica el dominio permitido para solicitar recursos
  methods: ['GET', 'PUT', 'POST', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'user-agent'], // Cabeceras permitidas
  credentials: true // Permite enviar cookies en las solicitudes
};

const port = process.env.port;
//inicializar instancia de servidor
const app = express();

app.use(cors(corsOptions))
app.use(express.json())

  
//usar puerto 3000
app.listen(port, () =>{
    console.log("escuchando en puerto 3000")
})
