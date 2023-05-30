import prismaClient from '../../prisma'
import '../../utils/patch.js'

class GetBlogService {
    async execute() {
        const posts = await prismaClient.blog_posts.findMany({
            take: 5,
            skip: 0,
            where: {
                post_status: "publish",
            },
            orderBy: {
                ID: "desc"
            },
            select: {
                ID: true,
                post_title: true,
                post_date: true,
                post_status: true,
                guid: true
            }
        })


        return posts
    }
}

export { GetBlogService }