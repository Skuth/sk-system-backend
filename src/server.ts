require("dotenv").config()

import express from "express"
import path from "path"
import cors from "cors"

import "express-async-errors"
import "./database/connection"

import routes from "./routes"
import errorHandler from "./errors/handler"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1" ,routes)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")))
app.use(errorHandler)

const PORT = process.env.API_PORT || 3333

app.listen(PORT, () => console.log(`Api is running on port ${PORT}`))