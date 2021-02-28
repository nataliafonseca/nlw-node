import request from "supertest";
import { app } from "../app";
import { getConnection } from "typeorm";

import createConnection from "../database";

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Survey Example",
      description: "Survey description example."
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

});
