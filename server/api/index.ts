import express from "express";
import { configDotenv } from "dotenv"
import { urlRouter } from "./routes/url";
import { connectionToDB } from "./utils/db";
import cors from 'cors'
configDotenv()
connectionToDB()

const server = express()
server.get("/", (req, res) => { res.send("Express on Vercel") });

server.use(cors())
server.use(express.json())
server.use('/', urlRouter)

server.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT}`);
})