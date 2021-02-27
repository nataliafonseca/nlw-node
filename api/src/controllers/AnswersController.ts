import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswersController {
  
  
  // http://localhost:3333/answers/1?u=e72dff2a-9379-4522-b930-4bea240e93a6
  
  /**
  * Route Params => Parâmetros que compõem a rota.
  * routes.get("/answers/:value")
  * 
  * Query Params => Busca, Paginmação, não obrigatórios. Vem após o '?'
  * chave = valor
  */
  
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    
    const { u } = request.query;
    
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
    
    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    });

    if (!surveyUser) {
      return response.status(400).json({
        error: "Survey/User does not exist"
      });
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.status(200).json(surveyUser);
  }
}

export { AnswersController };
