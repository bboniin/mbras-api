import { Request, Response } from 'express';
import { GetProprietiesHomeService } from '../../services/Home/GetProprietiesHomeService';

class GetProprietiesHomeController {
    async handle(req: Request, res: Response) {

        const getProprietiesHomeService = new GetProprietiesHomeService

        const users = await getProprietiesHomeService.execute()

        return res.json(users)
    }
}

export { GetProprietiesHomeController }