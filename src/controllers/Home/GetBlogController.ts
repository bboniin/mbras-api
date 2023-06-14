import { Request, Response } from 'express';
import { GetBlogService } from '../../services/Home/GetBlogService';

class GetBlogController {
    async handle(req: Request, res: Response) {

        const getBlogService = new GetBlogService

        const posts = await getBlogService.execute()

        return res.json(posts)
    }
}

export { GetBlogController }