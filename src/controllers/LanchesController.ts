import { Request, Response } from "express"
import { getRepository } from "typeorm"
import lancheView from "../views/lanches_view"
import responseView from "../views/response_view"
import * as Yup from "yup"
import path from "path"
import fs from "fs"

import Lanche from "../models/Lanche"

export default {
  async index(req: Request, res: Response) {
    let pagina: number = 0
    let limite: number = 5

    const { pagina: queryPagina, limite: queryLimite } = req.query

    if (typeof queryPagina !== "undefined") pagina = parseInt(queryPagina.toString())
    if (typeof queryLimite !== "undefined") limite = parseInt(queryLimite.toString())

    if (pagina < 1) pagina = 1

    const lanchesRepository = getRepository(Lanche)

    const lanches = await lanchesRepository.find({
      take: limite,
      skip: ((pagina - 1) * limite)
    })

    const count = await lanchesRepository.count()

    return res.header({"Data-count": count}).json(lancheView.renderMany(lanches))
  },

  async show(req: Request, res: Response) {
    const { id } = req.params

    const lanchesRepository = getRepository(Lanche)
    const lanche = await lanchesRepository.findOneOrFail(id)
    
    return res.json(lancheView.render(lanche))
  },

  async create(req: Request, res: Response) {
    const {
      name,
      price,
      category_id
    } = req.body

    const requestImage = req.file as Express.Multer.File
    const image = requestImage?.filename ||""

    const data = {
      name,
      price,
      category_id,
      image
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      image: Yup.string().required()
    })

    await schema.validate(data, {
      abortEarly: false
    })


    const lanchesRepository = getRepository(Lanche)
    const lanche = lanchesRepository.create(data)
    await lanchesRepository.save(lanche)

    return res.status(201).json(lancheView.render(lanche))    
  },

  async delete(req: Request, res: Response) {
    const { id } = req.body

    const lanchesRepository = getRepository(Lanche)

    const lancheData = await lanchesRepository.findOne(id)

    if (lancheData) {
      const image = lancheData.image

      const lanche = await lanchesRepository.delete(id)

      if (lanche) fs.unlinkSync(path.join(__dirname, "..", "..", "uploads", image))

      return res.json(responseView.render(`Lanche de id ${id} deletado com sucesso!`))
    } else {
      return res.status(404).json(responseView.render(`Id ${id} não foi encontrado.`))
    }

    
  }
}