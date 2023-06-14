import { Request, Response } from 'express';
import { ListFavoritosService } from '../../services/Imovel/ListFavoritosService';

const tagFilter = {
    "casa": 7,
    "apartamento": 7,
    "comercial": 7,
    "reforma": 7,
}

class ListFavoritosController {
    async handle(req: Request, res: Response) {
        const listFavoritosService = new ListFavoritosService

        const { imoveis } = req.query

        const favoritos = await listFavoritosService.execute({imoveis: imoveis ? String(imoveis) : ""})

        return res.json(favoritos)
    }
}

export { ListFavoritosController }