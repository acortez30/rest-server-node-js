import express from 'express';
import cors from 'cors';
import usersRoutes from '../routes/usuarios.routes.js';
import dotenv from 'dotenv';

dotenv.config();

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(cors());
    //Lectura y parseo
    this.app.use(express.json()); // Habilita recibir JSON en body
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use('/api/usuarios', usersRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}