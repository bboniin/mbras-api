import { Request, Response } from 'express';
import { ListImoveisService } from '../../services/Home/ListImoveisService';

class ListImoveisController {
    async handle(req: Request, res: Response) {
        const listImoveisService = new ListImoveisService

        const users = await listImoveisService.execute()

        return res.json(users)
    }
}

export { ListImoveisController }