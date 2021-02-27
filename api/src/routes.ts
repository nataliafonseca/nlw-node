import { Router } from "express";
import { AnswersController } from "./controllers/AnswersController";
import { NpsController } from "./controllers/NpsController";
import { SendMailController } from "./controllers/SendMailController";
import { SurveysController } from "./controllers/SurveysController";
import { UsersController } from "./controllers/UsersController";

const router = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answersController = new AnswersController();
const npsController = new NpsController();

router.get("/users", usersController.show);
router.post("/users", usersController.create);
router.get("/surveys", surveysController.show);
router.post("/surveys", surveysController.create);
router.post("/sendMail", sendMailController.execute);
router.get("/answers/:value", answersController.execute);
router.get("/nps/:survey_id", npsController.execute);

export { router };

