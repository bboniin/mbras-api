import { Request, Response } from 'express';
import { GetFilterService } from '../../services/Home/GetFilterService';

class GetFilterController {
    async handle(req: Request, res: Response) {
        const getFilterService = new GetFilterService

        const filter = await getFilterService.execute()

        return res.json(filter)
    }
}

export { GetFilterController }