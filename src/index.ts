import express from "express";
import dotenv from "dotenv";
import router from "./router/books-routes.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use(router)

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running in port: ${port}`));