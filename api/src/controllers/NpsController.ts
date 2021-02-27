import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {
  
  /**
  * Calculo do NPS:
  * 
  * 1 2 3 4 5 6 7 8 9 10
  * Detratores => 0 - 6
  * Passivos => 7 - 8 
  * Promotores => 9 - 10
  * 
  * (número de Promotores - número de detratores) / (número de respondentes) x 100
  * 
  */
  
  
  async execute(request: Request, response: Response) {
    
    const { survey_id } = request.params;
    
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
    
    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    });
    
    const detractors = surveysUsers.filter((survey) => survey.value >= 0 && survey.value <= 6).length;
    const passives = surveysUsers.filter((survey) => survey.value >= 7 && survey.value <= 8).length;
    const promoters = surveysUsers.filter((survey) => survey.value >= 9 && survey.value <= 10).length;
    const totalAnswer = surveysUsers.length;

    const nps = ((promoters - detractors) / totalAnswer * 100).toFixed(2);

    return response.json({
      detractors: detractors,
      passives: passives,
      promoters: promoters,
      NPS: nps,
    });
  }
}

export { NpsController };
