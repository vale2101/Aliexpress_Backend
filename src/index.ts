import dotenv from "dotenv";
import Server from "./server";  // 👈 aquí va sin llaves porque usas export default

dotenv.config();

const server = new Server();
server.listen();
console.log("Server is running on port", process.env.PORT);