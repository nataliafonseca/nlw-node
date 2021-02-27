import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersController {
  async create(request: Request, response: Response) {
    
    const { name, email } = request.body;
    
    const userRepository = getCustomRepository(UsersRepository);
    
    // SELECT * FROM users WHERE email = "email"
    const userAlreadyExists = await userRepository.findOne({ 
      email 
    });

    if (userAlreadyExists) {
      return response.status(400).json({
        error: "User already exists.",
      });
    }
    
    const user = userRepository.create({
      name, email
    });
    
    await userRepository.save(user);
    
    return response.status(201).json(user);
  }

  async show(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UsersRepository);

    const all = await usersRepository.find();

    return response.json(all);
  }
}

export { UsersController };

