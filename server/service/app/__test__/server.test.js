const app = require('../../app')
const request = require('supertest')
const { User, Service,Barber,Order, Vote } = require('../models/index')
// const midtransClient = require("midtrans-client");

const { createToken } = require("../helpers/jwt")

const midtransClient = jest.createMockFromModule('midtrans-client');

const userTest = {
  username: "anggorego",
  email: "test@mail.com",
  password: "testing",
  phoneNumber: "0821232323",
  role: 'Customer'
};
const userTestLogin = {
  email: "test@mail.com",
  password: "testing",
};

const orderTest = {
  userMonggoId:'1',
  barberId: 1,
  serviceId: 1,
  address: 'fake address',
  date: "22/12/2022",
  hour: "19.00",
  price: 20000,
  paymentUrl: 'https://test.com/',
  orderKey: '123'
};

const serviceTest = {
  name: "basic cut",
  price: 1000,
};

const barberTest = {
  name: "lebron james",
  email: "lebron.james@mail.com",
  password: "testing",
  phoneNumber: "0821232323",
};
const voteTest = {
  barberId: 1,
  userId: 1,
};

let token;

const invalidToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9.gShAB2qaCUjlnvNuM1MBWfBVEjDGdqjWSJNMEScXIeE";

beforeAll((done) => {
  Promise.all([Service.create(serviceTest),Barber.create(barberTest)])
    .then((datas) => {
      
      Order.create(orderTest)
      done();
    })
    .catch((err) => {
      done(err);
    });
});

beforeEach(() => {
  jest.restoreAllMocks();
});

afterAll((done) => {
  Promise.all([
    // User.destroy({ truncate: true, cascade: true, restartIdentity: true }),
    Order.destroy({ truncate: true, cascade: true, restartIdentity: true }),
    Service.destroy({ truncate: true, cascade: true, restartIdentity: true }),
    Barber.destroy({ truncate: true, cascade: true, restartIdentity: true }),
    Vote.destroy({ truncate: true, cascade: true, restartIdentity: true })
  ])
  .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

// beforeAll(async() => {
//   const services = await Service.create(serviceTest)
//   const barbers = await Barber.create(barberTest)
//   const users = await User.create(userTest,{returning:true})
//   const token = createToken({
//     id: users.id,
//     email: users.email,
//     role: users.role,
//   })
  // User.findAll().then((daata)=>{
  //   console.log(daata,'<<<<<<<<<<<>>>>>>>>>>>>>!!!!!!');
  // })
  // User.create(userTest)
  // .then((data)=>{
  //   console.log(data,'!!!!!!!!!!!!');
  // })
  // Promise.all([Service.create(serviceTest),Barber.create(barberTest)]) 
  // .then((datas)=>{
  //   token = createToken({
  //     id: datas[0].id,
  //     email: datas[0].email,
  //     role: datas[0].role,
  //   })
  // })
  // .catch(err=>{
  //   done(err)
  // })
// });

// beforeEach(() => {
//   jest.restoreAllMocks()
// })

// afterAll(done=>{
//   Promise.all([User.destroy({ truncate: true, cascade: true, restartIdentity: true}),Service.destroy({ truncate: true, cascade: true, restartIdentity: true})])
//   User.destroy({ truncate: true, cascade: true, restartIdentity: true},Barber.destroy({ truncate: true, cascade: true, restartIdentity: true})
//   ,Vote.destroy({ truncate: true, cascade: true, restartIdentity: true}))
//   .then(_=>{
//     done()
//   })
//   .catch(err => {
//     done(err)
//   })
 
// })
// console.log(Barber);
// describe("user routes test", () => {
//   describe("POST /register - create new user", () => {
//     describe("succes register test", () => {
//       test("201 Success register - should create new User", (done) => {
//         request(app)
//           .post("/register")
//           .send(userTest)
//           .end((err, res) => {
//             if (err) return done(err);
//             const { body, status } = res;

//             expect(status).toBe(201);
//             expect(body).toEqual(expect.any(Object));
//             expect(body).toHaveProperty("id", expect.any(Number));
//             expect(body).toHaveProperty("email", userTest.email);
//             return done();
//           });
//       });
//     });

//     describe("failed resgister test", () => {
//       test("400 Failed register - should return error if email is null", (done) => {
//         request(app)
//           .post("/register")
//           .send({
//             username: "anggorego",
//             password: "testing",
//             phoneNumber: "0821232323",
//           })
//           .end((err, res) => {
//             if (err) return done(err);
//             const { body, status } = res;

//             expect(status).toBe(400);
//             expect(body).toEqual(expect.any(Object));
//             expect(body).toHaveProperty("message", "Email is required");
//             return done();
//           });
//       });
//       test("400 Failed register - should return error if username is null", (done) => {
//         request(app)
//           .post("/register")
//           .send({
//             email: "testing@mail.com",
//             password: "testing",
//             phoneNumber: "0821232323",
//           })
//           .end((err, res) => {
//             if (err) return done(err);
//             const { body, status } = res;

//             expect(status).toBe(400);
//             expect(body).toEqual(expect.any(Object));
//             expect(body).toHaveProperty("message", "Username is required");
//             return done();
//           });
//       });
//       test("400 Failed register - should return error if password is null", (done) => {
//         request(app)
//           .post("/register")
//           .send({
//             username: "anggorego",
//             email: "testing@mail.com",
//             phoneNumber: "0821232323",
//           })
//           .end((err, res) => {
//             if (err) return done(err);
//             const { body, status } = res;

//             expect(status).toBe(400);
//             expect(body).toEqual(expect.any(Object));
//             expect(body).toHaveProperty("message", "Password is required");
//             return done();
//           });
//       });
//       test("400 Failed register - should return error if Phone Number is null", (done) => {
//         request(app)
//           .post("/register")
//           .send({
//             username: "anggorego",
//             email: "testing@mail.com",
//             password: " testing",
//           })
//           .end((err, res) => {
//             if (err) return done(err);
//             const { body, status } = res;

//             expect(status).toBe(400);
//             expect(body).toEqual(expect.any(Object));
//             expect(body).toHaveProperty("message", "Phone Number is required");
//             return done();
//           });
//       });
//       test("400 Failed register - should return error if username is empty", (done) => {
//         request(app)
//           .post("/register")
//           .send({
//             username: "",
//             email: "testing@mail.com",
//             password: "testing",
//             phoneNumber: "0821232323",
//           })
//           .end((err, res) => {
//             if (err) return done(err);
//             const { body, status } = res;

//             expect(status).toBe(400);
//             expect(body).toEqual(expect.any(Object));
//             expect(body).toHaveProperty("message", "Username is required");
//             return done();
//           });
//       });
//       test("400 Failed register - should return error if email is empty", (done) => {
//         request(app)
//           .post("/register")
//           .send({
//             username: "anggorego",
//             email: "",
//             password: "testing",
//             phoneNumber: "0821232323",
//           })
//           .end((err, res) => {
//             if (err) return done(err);
//             const { body, status } = res;

//             expect(status).toBe(400);
//             expect(body).toEqual(expect.any(Object));
//             expect(body).toHaveProperty("message", "Email is required");
//             return done();
//           });
//       });
//       test("400 Failed register - should return error if password is empty", (done) => {
//         request(app)
//           .post("/register")
//           .send({
//             username: "anggorego",
//             email: "testing@mail.com",
//             password: "",
//             phoneNumber: "0821232323",
//           })
//           .end((err, res) => {
//             if (err) return done(err);
//             const { body, status } = res;

//             expect(status).toBe(400);
//             expect(body).toEqual(expect.any(Object));
//             expect(body).toHaveProperty("message", "Password is required");
//             return done();
//           });
//       });
//       test("400 Failed register - should return error if phone number is empty", (done) => {
//         request(app)
//           .post("/register")
//           .send({
//             username: "anggorego",
//             email: "testing@mail.com",
//             password: "testing",
//             phoneNumber: "",
//           })
//           .end((err, res) => {
//             if (err) return done(err);
//             const { body, status } = res;

//             expect(status).toBe(400);
//             expect(body).toEqual(expect.any(Object));
//             expect(body).toHaveProperty("message", "Phone Number is required");
//             return done();
//           });
//       });
//     });
//   });
//   describe("POST /login - success test", () => {
//     test("200 Success login - should return access_token", (done) => {
//       request(app)
//         .post("/login")
//         .send(userTestLogin)
//         .end((err, res) => {
//           if (err) return done(err);
//           const { body, status } = res;

//           expect(status).toBe(200);
//           expect(body).toEqual(expect.any(Object));
//           expect(body).toHaveProperty("access_token", expect.any(String));
//           return done();
//         });
//     });
//   });
//   describe("POST /login - failed test", () => {
//     test("401 Failed login - should return error when user not found", (done) => {
//       request(app)
//         .post("/login")
//         .send({
//           email: "salah@mail.com",
//           password: "salah",
//         })
//         .end((err, res) => {
//           if (err) return done(err);
//           const { body, status } = res;

//           expect(status).toBe(401);
//           expect(body).toEqual(expect.any(Object));
//           expect(body).toHaveProperty("message", "Invalid email/password");
//           return done();
//         });
//     });
//     test("401 Failed login - should return error when incorrect password", (done) => {
//       request(app)
//         .post("/login")
//         .send({
//           email: "testing@mail.com",
//           password: "testings",
//         })
//         .end((err, res) => {
//           if (err) return done(err);
//           const { body, status } = res;

//           expect(status).toBe(401);
//           expect(body).toEqual(expect.any(Object));
//           expect(body).toHaveProperty("message", "Invalid email/password");
//           return done();
//         });
//     });
//   });
// });


describe("order rouets test", () => {
  describe("POST /orders", () => {
    describe("succes create order", () => {
      test("201 Success create order - should create new Order", (done) => {
        token = createToken({
          userMonggoId: '1',
          ...userTest
        })
        console.log(token);
    
        request(app)
          .post("/orders")
          .set("access_token", token)
          .send(orderTest)
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            console.log('res post 201 cases', body, status)
            expect(status).toBe(201);
            // expect(body).toEqual(expect.any(Object));
            return done();
          });
      });
    });
    describe("failed create order", () => {
      test("400 failed create order - should return error if barberId is Empty", (done) => {
        token = createToken({
          userMonggoId: '1',
          ...userTest
        })
        request(app)
          .post("/orders")
          .set("access_token", token)
          .send({
            userId: 1,
            barberId: 0,
            date: "22/12/2022",
            hour: " 19.00",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            return done();
          });
      });
      test("400 failed create order - should return error if date is Empty", (done) => {
        token = createToken({
          userMonggoId: '1',
          ...userTest
        })
        request(app)
          .post("/orders")
          .set("access_token", token)
          .send({
            userId: 1,
            barberId: 0,
            date: "",
            hour: "19.00",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));

            return done();
          });
      });
      test("400 failed create order - should return error if hour is Empty", (done) => {
        token = createToken({
          userMonggoId: '1',
          ...userTest
        })
        request(app)
          .post("/orders")
          .set("access_token", token)
          .send({
            userId: 1,
            barberId: 1,
            date: "22/12/2022",
            hour: "",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));

            return done();
          });
      });
      test("400 failed create order - should return error if hour is null", (done) => {
        token = createToken({
          userMonggoId: '1',
          ...userTest
        })
        request(app)
          .post("/orders")
          .set("access_token", token)
          .send({
            userId: 1,
            barberId: 1,
            date: "22/12/2022",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));

            return done();
          });
      });
      test("400 failed create order - should return error if date is null", (done) => {
        token = createToken({
          userMonggoId: '1',
          ...userTest
        })
        request(app)
          .post("/orders")
          .set("access_token", token)
          .send({
            userId: 1,
            barberId: 1,
            hour: "",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));

            return done();
          });
      });
    });
  });
  describe("GET /orders", () => {
    test("200 Success orders", (done) => {
      token = createToken({
        id: 1,
        ...userTest
      })
      request(app)
        .get("/orders")
        .set("access_token", token)
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(Array.isArray(body)).toBeTruthy();
          expect(body.length).toBeGreaterThan(0);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("401 failed get orders with invalid token", (done) => {
      token = createToken({
        id: 1,
        ...userTest
      })
      request(app)
        .get("/orders")
        .set("access_token", invalidToken)
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(401);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("message", "invalid signature");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("500 Failed getBarbers - should return error ", (done) => {
      jest.spyOn(Barber, "findAll").mockRejectedValue(new Error("test error"));

      request(app)
        .get("/barbers")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(500);
          return done();
        });
    });
  });
  describe("GET /orders/:id", () => {
    test("200 Success get order by id", (done) => {
      request(app)
        .get("/orders/1")
        .set("access_token", token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("id", expect.any(Number));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("500 Failed getBarbers - should return error ", (done) => {
      jest.spyOn(Barber, "findAll").mockRejectedValue(new Error("test error"));

      request(app)
        .get("/barbers/1")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(500);
          return done();
        });
    });
  });
  describe("DELETE /orders/:id", () => {
    test("200 Success delete order by id", (done) => {
      request(app)
        .delete("/orders/1")
        .set("access_token", token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("404 failed delete order by id", (done) => {
      request(app)
        .delete("/orders/1")
        .set("access_token", token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(404);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("500 Failed delete - should return error ", (done) => {
      jest.spyOn(Barber, "destroy").mockRejectedValue(new Error("test error"));

      request(app)
        .delete("/barbers/1")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(500);
          return done();
        });
    });
  });
});

describe("barber routes test", () => {
  describe("POST /barbers", () => {
    describe("success create barber", () => {
      test("201 Success add barber - should add new barber", (done) => {
        request(app)
          .post("/barbers")
          // .set('access_token', token)
          .send(barberTest)
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(201);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", barberTest.name);
            expect(body).toHaveProperty("email", barberTest.email);
            return done();
          });
      });
    });
    describe("failed create barber", () => {
      test("400 Failed create - should return error if name is null", (done) => {
        request(app)
          .post("/barbers")
          .send({
            email: "lebron.james@mail.com",
            password: "testing",
            phoneNumber: "0821232323",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty("message", "Name is required");
            return done();
          });
      });
      test("400 Failed create - should return error if email is null", (done) => {
        request(app)
          .post("/barbers")
          .send({
            name: "lebron james",
            password: "testing",
            phoneNumber: "0821232323",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty("message", "Email is required");
            return done();
          });
      });
      test("400 Failed create - should return error if password is null", (done) => {
        request(app)
          .post("/barbers")
          .send({
            name: "lebron james",
            email: "lebron.james@mail.com",
            phoneNumber: "0821232323",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty("message", "Password is required");
            return done();
          });
      });
      test("400 Failed create - should return error if phone number is null", (done) => {
        request(app)
          .post("/barbers")
          .send({
            name: "lebron james",
            email: " lebron.james@mail.com",
            password: "testing",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty("message", "Phone Number is required");
            return done();
          });
      });
      test("400 Failed register - should return error if username is empty", (done) => {
        request(app)
          .post("/barbers")
          .send({
            name: "",
            email: "testing@mail.com",
            password: "testing",
            phoneNumber: "0821232323",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty("message", "Name is required");
            return done();
          });
      });
      test("400 Failed register - should return error if email is empty", (done) => {
        request(app)
          .post("/barbers")
          .send({
            name: "anggorego",
            email: "",
            password: "testing",
            phoneNumber: "0821232323",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty("message", "Email is required");
            return done();
          });
      });
      test("400 Failed register - should return error if password is empty", (done) => {
        request(app)
          .post("/barbers")
          .send({
            name: "anggorego",
            email: "testing@mail.com",
            password: "",
            phoneNumber: "0821232323",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty("message", "Password is required");
            return done();
          });
      });
      test("400 Failed register - should return error if phone number is empty", (done) => {
        request(app)
          .post("/barbers")
          .send({
            name: "anggorego",
            email: "testing@mail.com",
            password: "testing",
            phoneNumber: "",
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty("message", "Phone Number is required");
            return done();
          });
      });
      test("500 Failed register - should return error ", (done) => {
        jest.spyOn(Barber, "create").mockRejectedValue(new Error("test error"));

        request(app)
          .post("/barbers")
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;

            expect(status).toBe(500);
            return done();
          });
      });
    });
  });
  describe("GET /barbers", () => {
    test("200 Success get barbers", (done) => {
      request(app)
        .get("/barbers")
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(Array.isArray(body)).toBeTruthy();
          expect(body.length).toBeGreaterThan(0);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("500 Failed getBarbers - should return error ", (done) => {
      jest.spyOn(Barber, "findAll").mockRejectedValue(new Error("test error"));

      request(app)
        .get("/barbers")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(500);
          return done();
        });
    });

    test("200 Success get barbers by id", (done) => {
      request(app)
        .get("/barbers/1")
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty("id", expect.any(Number));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("500 Failed getBarbers - should return error ", (done) => {
      jest.spyOn(Barber, "findOne").mockRejectedValue(new Error("test error"));

      request(app)
        .get("/barbers/1")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(500);
          return done();
        });
    });
  });
  describe("DELETE /barbers", () => {
    test("200 Success delete barbers", (done) => {
      request(app)
        .delete("/barbers/1")
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("500 faield delete barbers", (done) => {
      request(app)
        .delete("/barbers/1")
        .then((response) => {
          const { body, status } = response;

          expect(status).toBe(500);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  describe("UPDATE /barbers", () => {
    test("200 Success update barber - should update barber", (done) => {
      Barber.create(barberTest).then((result) => {
        request(app)
          .put(`/barbers/${result.id}`)
          // .set('access_token', token)
          .send(barberTest)
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(200);
            return done();
          });
      });
    });

    test("404 Success update barber - should update barber", (done) => {
      request(app)
        .put(`/barbers/999`)
        // .set('access_token', token)
        .send({
          email: "lebron.james@mail.com",
          password: "testing",
          phoneNumber: "0821232323",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(404);
          return done();
        });
    });
  });

  describe("login barber", () => {
    test("200 Success login barber ", (done) => {
      request(app)
        .post("/barbers/login")
        // .set('access_token', token)
        .send({
          email: "lebron.james@mail.com",
          password: "testing",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          return done();
        });
    });
    test("401 failed", (done) => {
      request(app)
        .post("/barbers/login")
        // .set('access_token', token)
        .send({
          email: "lebron.james@mail.com",
          password: "testingsds",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(401);
          return done();
        });
    });
  });
});
describe("service routes test", () => {
  test("201 Success add service - should add new service", (done) => {
    request(app)
      .post("/services")
      .send(serviceTest)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(201);
        expect(body).toEqual(expect.any(Object));
        return done();
      });
  });
  test("200 Success  update service - should update service", (done) => {
    request(app)
      .put("/services/1")
      .send(serviceTest)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Object));
        return done();
      });
  });

  test("400 failed add service - should return error if name null", (done) => {
    request(app)
      .post("/services")
      .send({
        price: 10000,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        return done();
      });
  });
  test("400 failed add service - should return error if price null", (done) => {
    request(app)
      .post("/services")
      .send({
        name: "basic cut",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        return done();
      });
  });
  test("400 failed add service - should return error if name empty", (done) => {
    request(app)
      .post("/services")
      .send({
        name: "",
        price: 1000,
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        return done();
      });
  });
  test("400 failed add service - should return error if price empty", (done) => {
    request(app)
      .post("/services")
      .send({
        name: "basic cut",
        price: "",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(400);
        return done();
      });
  });
  test("404 failed update service - should return error", (done) => {
    request(app)
      .put("/services/99")
      .send({
        name: "basic cut",
        price: "",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(404);
        return done();
      });
  });

  test("500 Failed create - should return error ", (done) => {
    jest.spyOn(Service, "create").mockRejectedValue(new Error("test error"));
    request(app)
      .post("/services")
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(500);
        return done();
      });
  });

  test("500 Failed update - should return error ", (done) => {
    jest.spyOn(Service, "update").mockRejectedValue(new Error("test error"));
    request(app)
      .put("/services/1")
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(500);
        return done();
      });
  });

  test("200 Success get service - should  return service", (done) => {
    request(app)
      .get("/services")
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(200);
        return done();
      });
  });

  test("500 Failed get service - should return error ", (done) => {
    jest.spyOn(Service, "findAll").mockRejectedValue(new Error("test error"));
    request(app)
      .get("/services")
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(500);
        return done();
      });
  });

  test("500 Failed get service - should return error ", (done) => {
    jest.spyOn(Service, "findAll").mockRejectedValue(new Error("test error"));
    request(app)
      .get("/services/1")
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(500);
        return done();
      });
  });
  test("404 failed get service  - should return error", (done) => {
    request(app)
      .get(`/services/999`)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(404);
        return done();
      });
  });
  test("404 failed delete service  - should return error", (done) => {
    request(app)
      .delete(`/services/999`)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(404);
        return done();
      });
  });
  test("500 Failed delete service - should return error ", (done) => {
    jest.spyOn(Service, "findAll").mockRejectedValue(new Error("test error"));
    request(app)
      .delete("/services/1")
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        expect(status).toBe(500);
        return done();
      });
  });
});
describe("vote routes test", () => {
  test("201 Success up vote - should add new vote", (done) => {
    request(app)
      .post("/votes")
      .set("access_token", token)
      .send(voteTest)
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;
        console.log(body, "<<<<< vote");
        expect(status).toBe(201);
        expect(body).toEqual(expect.any(Object));
        return done();
      });
  });
});
