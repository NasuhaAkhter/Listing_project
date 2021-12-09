// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Blog from 'App/Models/Blog';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class BlogsController {

    public async getBlog(ctx: HttpContextContract) {
        const blogs = await Blog.all()
        return blogs
    }
    public async createBlog(ctx: HttpContextContract) {
        let data = ctx.request.all()
        let ob = {
            title: data.title,
            description: data.description,
        }
        let q = await Blog.create(ob);
        return await Blog.query().where("id", q.id).first();
    }

    public async editBlog(ctx: HttpContextContract) {
        let data = ctx.request.all()
        let ob = {
            title: data.title,
            description: data.description,
        }
       await Blog.query().where("id",data.id).update(ob)
       return await Blog.query().where("id",data.id).first()
    }

    public async deleteBlog(ctx: HttpContextContract) {
        let data = ctx.request.all()
       return await Blog.query().where("id",data.id).delete()
    }

   
}
