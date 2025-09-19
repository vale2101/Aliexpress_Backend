import express, { Application } from "express";
import routesRols from "./routes/rol.routes";
import userRoutes from "./routes/user.routes";
import productsRoutes from "./routes/products.routes";
import cors from "cors";
import cookieParser from "cookie-parser";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Aplicacion corriendo por el puerto", this.port);
    });
  }

middlewares() {
  // Parseo del body
  this.app.use(express.json());

  // Cors configurado correctamente
  this.app.use(cors({
    origin: 'http://localhost:3001', // <--- la URL de tu frontend
    credentials: true,               // <--- permite enviar cookies
  }));

  // ✅ Cookie parser
  this.app.use(cookieParser());
}


  routes() {
    this.app.use('/api/rol', routesRols); 
    this.app.use('/api/user', userRoutes); 
    this.app.use('/api/producto', productsRoutes); 
  }
}

export default Server;
