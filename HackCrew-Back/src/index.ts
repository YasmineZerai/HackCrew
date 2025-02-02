import express, { Request, Response, response } from "express";
import { createServer } from "node:http";
const app = express();
const server = createServer(app);
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
