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
  public async editPeople(ctx: HttpContextContract){
    let data = ctx.request.all()
    let ob = {
      name: data.name,
      email: data.email,
      title: data.title,
      image: data.image,
    }
   await Person.query().where("id",data.id).update(ob)
   return await Person.query().where("id",data.id).first()
  }
  public async uploadFile(ctx: HttpContextContract): Promise<any>{
    const profileImage = ctx.request.file('file', {
      size: '10mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp', 'doc', 'pdf'],
    })
    // return ctx.request.all()
    if (profileImage) {
    //  return profileImage
        let type = profileImage.extname


        await profileImage.move('filestore',{
            name: `${profileImage.clientName}.${profileImage.extname}`, overwrite: true,
          })
        const fileName = process.env.CLIENT+`${profileImage.clientName}.${profileImage.extname}`
        let upFile = process.env.CLIENT+`/filestore/${fileName}`
        return ctx.response.status(200).send({ response: upFile, type: type});

    }
    return ctx.response.status(422).send({ message: 'Invalid request' });

  }

}
