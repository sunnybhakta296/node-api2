
const mongoose = require("mongoose")
const supertest = require("supertest")

const createServer = require("../utils/server");
const SessionService = require("../service/session.service")
const UserService = require("../service/user.service");
const { createUseSessionHandler } = require("../controllers/session.controller");


const app = createServer();



const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  name: "Jane Doe",
};

const userInput = {
  email: "test@example.com",
  name: "Jane Doe",
  password: "Password123",
  passwordConfirmation: "Password123",
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: "PostmanRuntime/7.28.4",
  createdAt: new Date("2021-09-30T13:31:07.674Z"),
  updatedAt: new Date("2021-09-30T13:31:07.674Z"),
  __v: 0,
};

describe("user", () => {
  // user registration

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockReturnValueOnce(userPayload);


        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(200);

        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    //we have not impleted yet for comparision
    describe.skip("Given the password do not match", ()=> {
      it("shold return 404", async()=> {
        jest.clearAllMocks();
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockReturnValueOnce(userPayload);


        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send({...userInput, passwordConfirmation: "doesnotmatch"});

        expect(statusCode).toBe(400);

        expect(createUserServiceMock).not.toHaveBeenCalled();
      })
    })

    describe('Given the user service throws', ()=> {
      it("should return 409 error", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockRejectedValue('oh no :(');


        const { statusCode, body } = await supertest(app)
          .post("/api/users")
          .send(userInput);

        expect(statusCode).toBe(409);

        // expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    })
  });

  describe("create user session", ()=> {
    describe("given the username and password are valid", ()=> {
      it("should return a signed accessToken & refresh token", async()=> {
          jest.spyOn(UserService, 'validatePassword')
          .mockReturnValue(userPayload)

          jest.spyOn(SessionService, 'createSession').mockReturnValue(sessionPayload)

          const req = {
            get: () => {
              return "a user agent"
            },
            body: {
              email: "test@example.com",
              password: "Password123",
            }
          }

          const send = jest.fn()
          const res = {
            send
          }

           await createUseSessionHandler(req, res)

          expect(send).toHaveBeenCalledWith({
            accessToken: expect.any(String),
            refreshToken: expect.any(String),
          })
      })
    })
  })
});
