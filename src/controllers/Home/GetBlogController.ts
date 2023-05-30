import { Request, Response } from 'express';
import { GetBlogService } from '../../services/Home/GetBlogService';

class GetBlogController {
    async handle(req: Request, res: Response) {

        const getBlogService = new GetBlogService

        const users = await getBlogService.execute()

        return res.json(users)
    }
}

export { GetBlogController }