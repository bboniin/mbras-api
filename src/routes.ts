import { Router } from 'express'
import multer from 'multer'

import { isAuthenticated } from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'

import { ListImoveisController } from './controllers/Imovel/ListImoveisController'
import { GetImovelController } from './controllers/Imovel/GetImovelController'
import { GetBlogController } from './controllers/Home/GetBlogController'
import { GetProprietiesHomeController } from './controllers/Home/GetProprietiesHomeController'
import { GetFilterController } from './controllers/Home/GetFilterController'
import { ListFavoritosController } from './controllers/Imovel/ListFavoritosController'

const upload = multer(uploadConfig)

const router = Router()

router.get('/filter', new GetFilterController().handle)
router.get('/favoritos', new ListFavoritosController().handle)
router.get('/destaques', new GetProprietiesHomeController().handle)
router.get('/blog', new GetBlogController().handle)
router.get('/imoveis', new ListImoveisController().handle)
router.get('/imovel/:ref', new GetImovelController().handle)

router.use(isAuthenticated)

export { router }