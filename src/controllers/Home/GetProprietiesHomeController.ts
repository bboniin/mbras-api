import { Request, Response } from 'express';
import { GetProprietiesHomeService } from '../../services/Home/GetProprietiesHomeService';

class GetProprietiesHomeController {
    async handle(req: Request, res: Response) {

        const getProprietiesHomeService = new GetProprietiesHomeService

        const imoveis = await getProprietiesHomeService.execute()

        return res.json(imoveis)
    }
}

export { GetProprietiesHomeController }