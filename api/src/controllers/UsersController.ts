import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersController {
  async create(request: Request, response: Response) {
    
    const { name, email } = request.body;
    
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    });
    
    // if(!(await schema.isValid(request.body))) {
    //   return response.status(400).json({
    //     error: "Validation Failed",
    //   })
    // }
    
    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }
    
    const userRepository = getCustomRepository(UsersRepository);
    
    // SELECT * FROM users WHERE email = "email"
    const userAlreadyExists = await userRepository.findOne({ 
      email 
    });
    
    if (userAlreadyExists) {
      throw new AppError("User already exists.");
      
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

