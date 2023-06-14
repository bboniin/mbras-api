import { Request, Response } from 'express';
import { GetImovelService } from '../../services/Imovel/GetImovelService';

class GetImovelController {
    async handle(req: Request, res: Response) {
        const { ref } = req.params

        const getImovelService = new GetImovelService

        const imovel = await getImovelService.execute({ref})

        return res.json(imovel)
    }
}

export { GetImovelController }