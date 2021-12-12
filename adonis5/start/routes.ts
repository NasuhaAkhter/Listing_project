/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.get('getPeoples', 'OthersController.getPeoples')
Route.post('storePeople', 'OthersController.storePeople')
Route.post('editPeople', 'OthersController.editPeople')
Route.post('deletePeople', 'OthersController.deletePeople')
Route.post('uploadFile', 'OthersController.uploadFile')

Route.get('getBlog', 'BlogsController.getBlog')
Route.post('createBlog', 'BlogsController.createBlog')
Route.post('editBlog', 'BlogsController.editBlog')
Route.post('deleteBlog', 'BlogsController.deleteBlog')

Route.post('register', 'UsersController.register')
Route.post('login', 'UsersController.login')
Route.post('logout', 'UsersController.logout')
Route.get('initData', 'UsersController.initData')
Route.get('getUser', 'UsersController.getUser')






