import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "..";
import connectDataBase from "../../database/connectDataBase";
import usersRouter from "./usersRouters";
import User from "../../database/models/User";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST 'users/register' endpoint", () => {
  describe("When it receives a request with name 'Lorena' and password '123456789'", () => {
    test("Then it should respond statuts 201 and message 'The user has been created'", async () => {
      const expectedStatus = 201;
      const expectedMessage = "The user has been created";
      const mockUser = {
        name: "Lorena",
        password: "123456789",
      };

      const response = await request(app)
        .post("/users/login")
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
