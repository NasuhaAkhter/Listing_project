import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Person from 'App/Models/Person';

export default class OthersController {
  public async getPeoples() {
      const peoples = await Person.all()
      return peoples
  }
  public async storePeople(ctx: HttpContextContract) {
    let data = ctx.request.all()
    let ob = {
        name: data.name,
        email: data.email,
        title: data.title,
        image: data.image,
    }
    return await Person.create(ob);

  }
  public async deletePeople(ctx: HttpContextContract){
    let data = ctx.request.all()
    return await Person.query().where('id', data.id).delete();
  }

}
