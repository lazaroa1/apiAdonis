'use strict'

const User = use('App/Models/Users')
const {validateAll} = use('Validator')

class UserController {
  async create({request,response}) {
    try {

      const erroMessage = {
        'username.required': 'Esse campo é obrigatorio',
        'username.unique':'Esse usuário já existe',
        'username.min':'O username deve ter mais que 5 caracteres'
      }

      const validation = await validateAll(request.all(), {
        username: 'required|min:5|unique:users',
        email: 'required|email|unique:users',
        password: 'required|min:6'
        }, erroMessage)

        if(validation.fails()) {
          return response.status(401).send({messages: validation.messages()})
        }


      const data = request.only(['email', 'username', 'password'])

      const user = await User.create(data)

      return user

    } catch (error) {
      return response.status(500).send({error: `Erro: ${error.menssage}`})
    }

  }
}

module.exports = UserController
