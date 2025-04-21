import dotenv from 'dotenv';
import { Server } from './models/server.js';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear la instancia del servidor
const server = new Server();

// Iniciar el servidor
server.listen();