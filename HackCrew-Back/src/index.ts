import express, { Request, Response } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { configureRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/error";
import { setUpSocketServer } from "./socket";
import cors from "cors";
import path from "node:path";

dotenv.config();
const app = express();
const server = createServer(app);
app.use(cors());
export const io = new Server(server, {
  cors: { origin: "*" },
});
export const onlineUsers = new Map();
setUpSocketServer(io);
const mongodbString = process.env.MONGO_DB_URL;
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
configureRoutes(app);
app.use(errorMiddleware);
if (mongodbString !== undefined) {
  mongoose
    .connect(mongodbString)
    .then((value) => {
      console.log("connected to the database succesfully");
      const port = process.env.PORT;
      server.listen(port, () => {
        console.log(`listening on localhost:${port} `);
      });
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
}
