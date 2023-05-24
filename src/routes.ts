import { Router } from 'express'
import multer from 'multer'

import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'

import { ListImoveisController } from './controllers/Client/ListImoveisController'

const upload = multer(uploadConfig)

const router = Router()

router.get('/imoveis', new ListImoveisController().handle)

router.use(isAuthenticated)

export { router }