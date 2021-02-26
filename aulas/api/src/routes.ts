import { Router } from "express";
import { SurveysController } from "./controllers/SurveysController";
import { UsersController } from "./controllers/UsersController";

const router = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();

router.get("/users", usersController.show);
router.post("/users", usersController.create);
router.get("/surveys", surveysController.show);
router.post("/surveys", surveysController.create);

export { router };

