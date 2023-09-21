const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UsersController {
  
  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;

    const checkUserExists = await knex.select('email').where({ email }).from('users');

    if(checkUserExists.length > 0) {
      throw new AppError("Este e-mail já está em uso!", 401);
    }

    const hashedPassword = await hash(password, 8);
    
    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      isAdmin: true
    });

    return response.status(201).json();
  }
}

module.exports = UsersController;
