import { Router } from "express";
import { SendMailController } from "./controllers/SendMailController";
import { SurveysController } from "./controllers/SurveysController";
import { UsersController } from "./controllers/UsersController";

const router = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

router.get("/users", usersController.show);
router.post("/users", usersController.create);
router.get("/surveys", surveysController.show);
router.post("/surveys", surveysController.create);
router.post("/sendMail", sendMailController.execute);

export { router };

