const request = require("supertest");
const app = require("../app");
const db = require("../config/test.database");
const User = require('../models/user');
const { createToken, verifyToken } = require("../helpers/jwt");


let count = 0;
const generateUser = () => {
  count += 1;
  return {
    username: `test-user${count}`,
    email: `test-${count}@gmail.com`,
    password: 'testPassword123',
    phoneNumber: `08111122${count}`,
    role: 'Customer'
  }
};

const assertUser = (received, expected) => {
  expect(received.username).toBe(expected.username);
  expect(received.email).toBe(expected.email);
  expect(received.phoneNumber).toBe(expected.phoneNumber);
  expect(received.role).toBe(expected.role);
}

beforeAll(async () => {
  await db.connect()
});
afterEach(async () => {
    jest.restoreAllMocks();
    await db.clear();
});
afterAll(async () => {
  await db.close();
});

describe("users", () => {
  describe("Get /users", () => {
    test("successful", async () => {
      const user = await User.create(generateUser());
      const res = await request(app).get("/users");
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(1);
    });

    test("failed 500", async () => {
        jest.spyOn(User, 'find').mockRejectedValue(new Error("test error"));
        const res = await request(app).get("/users");
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual('test error');
      });
  });

  describe("Get /users/:Id", () => {
    test("successful", async () => {
      const user = await User.create(generateUser());
      const res = await request(app).get(`/users/${user.id}`);
      expect(res.statusCode).toEqual(200);
      assertUser(res.body, user);
    });

    test("failed 500", async () => {
      jest.spyOn(User, 'findById').mockRejectedValue(new Error("test error"));
      const user = await User.create(generateUser());
      const res = await request(app).get(`/users/${user.id}`);
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual('test error');
    });
    
    test("failed 400", async () => {
      const user = await User.create(generateUser());
      await User.findByIdAndDelete(user.id);
      const res = await request(app).get(`/users/${user.id}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual('User not found!');
    });
  });

  describe("Post /users", () => {
    test("successful", async () => {
      const mockUser = generateUser()
      const res = await request(app).post("/users").send(mockUser);
      expect(res.statusCode).toEqual(201);
      assertUser(res.body, mockUser);
    });

    test("Failed 400 - email aredy exist", async () => {
      const mockUser = generateUser();
      await User.create(mockUser);
      const res = await request(app).post("/users").send({
        username: 'test 3',
        email: mockUser.email,
        password: mockUser.password,

      });

      expect(res.statusCode).toEqual(400);
    });

    test("Failed 400 - empty username", async () => {
      const mockUser = generateUser();
      const res = await request(app).post("/users").send({
        username: '',
        email: mockUser.email,
        password: mockUser.password,
        phoneNumber: mockUser.phoneNumber
      });

      expect(res.statusCode).toEqual(400);
    });

    test("Failed 400 - empty email", async () => {
      const mockUser = generateUser();
      const res = await request(app).post("/users").send({
        username: mockUser.username,
        email: '',
        password: mockUser.password,
        phoneNumber: mockUser.phoneNumber
      });

      expect(res.statusCode).toEqual(400);
    });

    test("Failed 400 - invalid password", async () => {
      const mockUser = generateUser();
      const res = await request(app).post("/users").send({
        username: mockUser.username,
        email: mockUser.email,
        password: 'pass',
        phoneNumber: mockUser.phoneNumber
      });

      expect(res.statusCode).toEqual(400);
    });

    test("Failed 400 - invalid email", async () => {
      const mockUser = generateUser();
      const res = await request(app).post("/users").send({
        username: mockUser.username,
        email: 'invalid-email',
        password: mockUser.password,
        phoneNumber: mockUser.phoneNumber
      });

      expect(res.statusCode).toEqual(400);
    });

    test("Failed 500", async () => {
      const mockUser = generateUser();
      jest.spyOn(User, 'create').mockRejectedValue(new Error("test error"));
      const res = await request(app).post("/users").send(mockUser);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual("test error");
    });
  });

  describe("Put /users", () => {
    test("successful", async () => {
      const user = await User.create(generateUser());
      const res = await request(app).put("/users/" + user.id).send({username: 'test2'});

      expect(res.statusCode).toEqual(200);
      expect(res.body.username).toBe('test2');
     
    });

    test("successful update password", async () => {
      const user = await User.create(generateUser());
      const res = await request(app).put("/users/" + user.id).send({password: 'uopdatedPassword'});

      expect(res.statusCode).toEqual(200);
     
    });

    test("failed 500", async () => {
      jest.spyOn(User, 'findByIdAndUpdate').mockRejectedValue(new Error("test error"));
      const user = await User.create(generateUser());
      const res = await request(app).put("/users/" + user.id).send({username: 'test2'});

      expect(res.statusCode).toEqual(500);
      expect(res.body).toBe('test error');
    });

    test("failed 400 - invalid empty username", async () => {
      const user = await User.create(generateUser());
      const res = await request(app).put("/users/" + user.id).send({username: ''});

      expect(res.statusCode).toEqual(400);
    });

    test("failed 404 - Not found user id", async () => {
      const user = await User.create(generateUser());
      await User.findByIdAndRemove(user.id);
      const res = await request(app).put("/users/" + user.id).send({username: ''});
      expect(res.statusCode).toEqual(404);
    });

  });

  describe("Delete /users", () => {
    test("successful", async () => {
      const user = await User.create(generateUser());
      const res = await request(app).delete("/users/" + user.id).send();

      expect(res.statusCode).toEqual(200);
      deletedUser = await User.findById(user.id)
      expect(deletedUser).toBeNull();
     
    });

    test("Failed 500 - Internal server error", async () => {
      const user = await User.create(generateUser());
      jest.spyOn(User, 'findByIdAndRemove').mockRejectedValue(new Error('test error'));
      const res = await request(app).delete("/users/" + user.id).send();
      expect(res.statusCode).toEqual(500);
    });
  });

  describe("Login /users", () => {
    test("successful", async () => {
      const mockUser = generateUser();
      const user = await User.create(mockUser);
      const res = await request(app).post("/users/login/").send({email: mockUser.email, password: mockUser.password});
      expect(res.statusCode).toEqual(200);
      expect(res.body.access_token).toBeTruthy();
    });

    test("Failed 401 Invalid email", async () => {
      const mockUser = generateUser();
      const res = await request(app).post("/users/login/").send({email: 'invalid@mail.com', password: mockUser.password});
      expect(res.statusCode).toEqual(401);
    });

    test("Failed 401 Invalid password", async () => {
      const mockUser = generateUser();
      const user = await User.create(mockUser);
      const res = await request(app).post("/users/login/").send({email: mockUser.email, password: 'invalid'});
      expect(res.statusCode).toEqual(401);
    });

    test("Failed 500 - Internal server error", async () => {
      const mockUser = generateUser();
      const user = await User.create(mockUser);
      jest.spyOn(User, 'findOne').mockRejectedValue(new Error('test error'))
      const res = await request(app).post("/users/login/").send({email: mockUser.email, password: mockUser.password});
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual('test error');
    });

    test('verifyToken jwt helpers', async () => {
      const mockUser = generateUser();
      const user = await User.create(mockUser);
      mockUser.id = user.id;
      const token = createToken(mockUser);
      const payload = verifyToken(token);
      expect(payload.id).toBe(mockUser.id);
    });
  });

});