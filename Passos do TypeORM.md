# Passos do TypeORM

-> Passo 1 - migration

No terminal, criamos a migration:

```
yarn typeorm migration:create -n CreateSurveys
```

Entramos no arquivo .ts criado e configuramos o up e down, como no exemplo abaixo:

```ts
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveys1614323863918 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "surveys",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys");
    }

}

```

-> Passo 2 - model

Em models, criamos a entidade. No exemplo, `Survey.ts`

```ts
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("surveys")
class Survey{
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Survey };

```

-> Passo 3 - controller

Em controlers, criamos `SurveysController.ts`

```ts
import { Request, Response } from "express";

class SurveysController {
  async create(request: Request, response: Response) {}
}

export { SurveysController }

```

-> Passo 4 - repository

Em repositories, `SurveysRepository.ts`

```ts
import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";


@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> {

}

export { SurveysRepository };

```

-> Passo 5 - de volta ao controller

```ts
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({
      title,
      description
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);

  }
}

export { SurveysController }

```

-> Passo 6 - rota

Em `routes.ts`

```ts
import { Router } from "express";
import { SurveysController } from "./controllers/SurveysController";
import { UsersController } from "./controllers/UsersController";

const router = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();

router.post("/users", usersController.create);
router.post("/surveys", surveysController.create);

export { router };

```

-> Passo 7 - novamente, o controller

Vamos aproveitar para criar no crontroler um método para listagem das pesquisas!

```ts
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({
      title,
      description
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const all = await surveysRepository.find();

    return response.json(all);
  }
}

export { SurveysController };

```

-> Passo 8 - novas rotas

Adicionamos os métodos show como solicitação GET em `routes.ts`

```ts
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


```
