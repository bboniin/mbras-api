import { Router } from 'express'
import multer from 'multer'

import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'

import { ListImoveisController } from './controllers/Home/ListImoveisController'
import { GetImovelController } from './controllers/Imovel/GetImovelController'

const upload = multer(uploadConfig)

const router = Router()

router.get('/imoveis', new ListImoveisController().handle)
router.get('/imovel/:ref', new GetImovelController().handle)

router.use(isAuthenticated)

export { router }