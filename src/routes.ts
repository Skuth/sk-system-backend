import { Router } from "express"
import multer from "multer"

import LanchesController from "./controllers/LanchesController"

import uploadConfig from "./config/upload"

const routes = Router()
const upload = multer(uploadConfig)

routes.get("/lanches/list", LanchesController.index)
routes.get("/lanches/list/:id", LanchesController.show)
routes.post("/lanches/create", upload.single("image"), LanchesController.create)
routes.delete("/lanches/delete", LanchesController.delete)

export default routes