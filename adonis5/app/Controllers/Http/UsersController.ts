import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash'


export default class UsersController {
    public async register(ctx: HttpContextContract) {
        let data = ctx.request.all()

        const validationSchema = schema.create({
            name: schema.string({ trim: true }),
            email: schema.string({ trim: true }),
            password: schema.string({ trim: true })
        }) 
        const messages =  {
           'name.required': 'name is required',
           'email.required': 'email is required',
           'password.required': 'password is required',
        }
        try {
            await ctx.request.validate({ schema: validationSchema, messages: messages })
        }catch (error) {
          return ctx.response.status(422).send(error.messages)
        }
        if(data.password){
            data.password =  await Hash.make(data.password);
        } 
        let ob = {
            name: data.name,
            email: data.email,
            password: data.password,
        }
        let q = await User.create(ob);
        return await User.query().where("id", q.id).first();
    }

    public async login(ctx: HttpContextContract) {
        let data = ctx.request.all()
       
        let user=await User.query().where('email',data.email).first()
        if(user){
            if (!(await Hash.verify(user.password, data.password))) {
                return ctx.response.status(401).send({ message: 'Invalid Password!' })
            }
        }
        else {
            return ctx.response.status(401).send({ message: 'Invalid Credentials!' })
        }
        try {
           console.log('yes log')
            return ctx.auth.use("api").attempt(data.email, data.password)
          } catch (errors) {
            console.log(errors)
            return errors;
          }
    }

    async logout(ctx: HttpContextContract) {
        return await ctx.auth.logout()
      }

    public async initData(ctx: HttpContextContract) {
        let user = ctx.auth.user
        if(user){
            return user
        }
        return 'no user'
    }

    public async getUser(ctx: HttpContextContract) {
        try {
          const user = await ctx.auth.use("api").authenticate()
          return user
        } catch (error) {
          return false
        }
      }
}
