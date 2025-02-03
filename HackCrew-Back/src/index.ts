import express, { Request, Response } from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { configureRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/error";

dotenv.config();
const app = express();
const server = createServer(app);
const mongodbString = process.env.MONGO_DB_URL;
app.use(express.json());
configureRoutes(app);
app.use(errorMiddleware);
if (mongodbString !== undefined) {
  mongoose
    .connect(mongodbString)
    .then((value) => {
      console.log("connected to the database succesfully");
      const port = process.env.PORT;
      server.listen(port, () => {
        console.log(`listenning on localhost:${port} `);
      });
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
}
