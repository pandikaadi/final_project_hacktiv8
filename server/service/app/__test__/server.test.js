const app = require('../../app')
const request = require('supertest')
const {  Service,Barber,Order, Vote } = require('../models/index')
const { createToken } = require("../helpers/jwt")
// const midtrans = require('midtrans-client')
// jest.mock('midtrans-client')




const userTest = {
  id: '620a0610e279625ce506cbd3',
  username: "pelanggan",
  email: "pelanggan@gmail.com",
  password: "testing",
  phoneNumber: "0821232323",
  role: 'Customer'
};

const orderTest = {
  userMonggoId:'1',
  barberId: 1,
  serviceId: 1,
  address: 'fake address',
  city:'jawa',
  date: "01/01/2022",
  hour: "19.00",
  price: 20000,
  paymentUrl: 'https://test.com/',
  orderKey: '123356dfdf',
  lat:0.9999,
  long:10.000
};


const serviceTest = {
    name: "Hair Color",
    price: 600000,
    image: "https://images.unsplash.com/photo-1634302104565-cc698ee83144?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
};

const barberTest = {
  name: "lebron james",
  email: "lebron.james@mail.com",
  password: "testing",
  phoneNumber: "0821232323",
  city:'jawa',
  lat: 0.6000,
  long:10.0434,
};

const voteTest = {
  value: 1
};

// mock data generator helpers
let barberMockCount = 0;
const generateBarber = () => {
  barberMockCount += 1;
  return {
    name: `barber test ${barberMockCount}`,
    email: `barber.test${barberMockCount}@mail.com`,
    password: "testing",
    phoneNumber: `0821232323${barberMockCount}`,
    city:'jawa',
    lat: 0.6000,
    long:10.0434,
  }
}

let serviceMockCount = 0;
const generateService = () => {
  serviceMockCount += 1;
  return {
    name: `Hair Color ${serviceMockCount}`,
    price: 1000 * serviceMockCount,
    image: "https://images.unsplash.com/photo-1634302104565-cc698ee83144?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }
}

let orderMockCount = 0;
const generateOrder = (userId, barberId, serviceId) => {
  orderMockCount += 1;
  return {
    userMonggoId: userId,
    barberId: barberId,
    serviceId: serviceId,
    address: 'fake address',
    city:'jawa',
    date: "01/01/2022",
    hour: "19.00",
    price: 20000,
    paymentUrl: 'https://test.com/',
    orderKey: `orderKey${orderMockCount}`,
    lat:0.9999,
    long:10.000
  }
}

const assertOrder = (received, expected) => {
  expect(received.barberId).toBe(expected.barberId);
}

let token ;

const invalidToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9.gShAB2qaCUjlnvNuM1MBWfBVEjDGdqjWSJNMEScXIeE";

beforeAll((done) => {
  Promise.all([Service.create(serviceTest),Barber.create(barberTest)])
    .then((datas) => {
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


describe("order rouets test", () => {
  describe("POST /orders", () => {
    describe("succes create order", () => {
      let midtrans = require('midtrans-client');
      jest.mock('midtrans-client');
      beforeEach(() => {
        midtrans.Snap.mockImplementation(() => {
          return {
            createTransaction: () => {
              return {
                token: '123qwe',
              };
            },
          };
        });
      });
      test("201 Success create order - should create new Order", async () => {
        token = createToken(userTest)

        const barber = await Barber.create(generateBarber());
        const service = await Service.create(generateService());
        const mockOrder = generateOrder(userTest.userMonggoId, barber.id, service.id );

        const res = await request(app)
          .post("/orders")
          .set("access_token", token)
          .send(mockOrder)
        expect(res.status).toBe(201);
        assertOrder(res.body.findOrder, mockOrder);
      });
    }, 10000);
    describe("failed create order", () => {
      let midtrans = require('midtrans-client');
      jest.mock('midtrans-client');
      beforeEach(() => {
        midtrans.Snap.mockImplementation(() => {
          return {
            createTransaction: () => {
              return {
                token: '123qwe',
              };
            },
          };
        });
      });
      test("400 failed create order - should return error if barberId is Empty", () => {
        token = createToken(userTest)
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
        token = createToken(userTest)
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
        token = createToken(userTest)
        request(app)
          .post("/orders")
          .set("access_token", token)
          .send({
            userMonggoId:'1',
            barberId: 1,
            serviceId: 1,
            address: 'fake address',
            city:'jawa',
            date: "01/01/2022",
            hour: "",
            price: 20000,
            paymentUrl: 'https://test.com/',
            orderKey: '123356dfdf',
            lat:0.9999,
            long:10.000
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));

            return done();
          });
      });
      // test("400 failed create order - should return error if hour is null", (done) => {
      //   token = createToken(userTest)
      //   request(app)
      //     .post("/orders")
      //     .set("access_token", token)
      //     .send({
      //       userId: 1,
      //       barberId: 1,
      //       date: "22/12/2022",
      //     })
      //     .end((err, res) => {
      //       if (err) return done(err);
      //       const { body, status } = res;

      //       expect(status).toBe(400);
      //       expect(body).toEqual(expect.any(Object));

      //       return done();
      //     });
      // });
      test("400 failed create order - should return error if date is null", (done) => {
        token = createToken(userTest)
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
      test("500 Failed register - should return error ", (done) => {
        jest.spyOn(Order, "create").mockRejectedValue(new Error("test error"));
        token = createToken(userTest)
        request(app)
        .set("access_token", token)
          .post("/orders")
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(500);
            return done();
          });
      });
    });
  });
  describe("GET /orders", () => {
    let midtrans = require('midtrans-client');
    jest.mock('midtrans-client');
    beforeEach(() => {
      midtrans.Snap.mockImplementation(() => {
        return {
          createTransaction: () => {
            return {
              token: '123qwe',
            };
          },
        };
      });
    });
    test("200 Success orders", (done) => {
      token = createToken({
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
      // token = createToken({
      //   userTest
      // })
      request(app)
        .get("/orders")
        .set("access_token", invalidToken)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
     
    
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("500 Failed get  - should return error ", (done) => {
      jest.spyOn(Order, 'findAll').mockRejectedValue(new Error("test error"));
      request(app)
        .post("/orders")
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

    test("500 Failed getOrdersByid - should return error ", (done) => {
      jest.spyOn(Order, "findOne").mockRejectedValue(new Error("test error"));

      request(app)
        .get("/orders/1")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(500);
          return done();
        });
    });
  });

  describe('GET /orders/dailyOrders',()=>{
    test("200 Success get daily order", (done) => {
      token = createToken({
        userTest
      }) 
      request(app)
        .get("/orders/dailyOrders?date=01/01/2022&&barberId=1")
        .set("access_token", token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          // expect(body).toEqual(expect.any(Object));
          // expect(body).toHaveProperty("id", expect.any(Number));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

  })
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
  describe("service routes test", () => {
    describe("POST /services", ()=>{
     
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
      test("400 failed add service - should return error if name null", (done) => {
        
        request(app)
          .post("/services")
          .send({
            price: 10000,
            image: "https://images.unsplash.com/photo-1634302104565-cc698ee83144?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
            image: "https://images.unsplash.com/photo-1634302104565-cc698ee83144?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
            image: "https://images.unsplash.com/photo-1634302104565-cc698ee83144?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
            image: "https://images.unsplash.com/photo-1634302104565-cc698ee83144?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(400);
            return done();
          });
      });
      test("400 failed add service - should return error if image empty", (done) => {
        request(app)
          .post("/services")
          .send({
            name: "basic cut",
            price: 10000,
            image: ""
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(400);
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
  })
    describe("GET /services", ()=>{
      test("200 Success get service - should  return service", async () => {
        const service = await Service.create(generateService());
        const res = await request(app).get("/services");
        expect(res.status).toBe(200)
        expect(res.body.length).toBeGreaterThan(0)
      });

    test("404 failed get service  - should return error", async () => {
      const res = await request(app)
        .get(`/services/9999999`)
      expect(res.status).toBe(404);
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
    })
    describe("PUT /services", ()=>{
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
    })
    describe("DELETE /services", ()=>{
      test("200 Success delete barbers", async () => {
        const service = await Service.create(generateService())
        const res = await request(app).delete(`/services/${service.id}`)
        expect(res.status).toBe(200);
        const deleted = await Service.findByPk(service.id);
        expect(deleted).toBeNull();

        
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
      test("500 Failed delete service - should return error ", async () => {
        jest.spyOn(Service, "destroy").mockRejectedValue(new Error("test error"));
        const service = await Service.create(generateService());
        const res = await request(app).delete(`/services/${service.id}`)
        expect(res.status).toBe(500)
      });
    })
  });
  describe("vote routes test", () => {
    test("201 Success up vote - should add new vote", (done) => {
      token = createToken({
        userTest
      })     
      request(app)
        .post("/votes/1")
        .set("access_token", token)
        .send(voteTest)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(201);
          expect(body).toEqual(expect.any(Object));
          return done();
        });
    });
    test("200 Success gey vote - should get votes", (done) => {
      token = createToken({
        userTest
      })     
      request(app)
        .get("/votes/1")
        .set("access_token", token)
        .send(voteTest)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          return done();
        });
    });
    test("400 failed create vote - should return error ", (done) => {
      token = createToken(userTest)
      request(app)
        .post("/votes/1")
        .set("access_token", token)
        .send({
      
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));

          return done();
        });
    });
    test("400 failed create vote - should return error ", (done) => {
      token = createToken(userTest)
      request(app)
        .post("/votes/1")
        .set("access_token", token)
        .send({
          value:''
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(400);
          expect(body).toEqual(expect.any(Object));

          return done();
        });
    });


    test("500 Failed upvote - should return error ", (done) => {
      jest.spyOn(Vote, "create").mockRejectedValue(new Error("test error"));
      request(app)
        .post("/votes/1")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(500);
          return done();
        });
    });
    test("500 Failed get votes - should return error ", (done) => {
      jest.spyOn(Vote, "findAll").mockRejectedValue(new Error("test error"));
      request(app)
        .get("/votes/1")
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(500);
          return done();
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
      test("500 Failed update barbers - should return error ", (done) => {
        jest.spyOn(Barber, "update").mockRejectedValue(new Error("test error"));
        request(app)
          .put("/barbers/1")
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
            expect(status).toBe(500);
            return done();
          });
      });
    });
    describe("DELETE /barbers", () => {
      test("200 Success delete barbers", async () => {
        const barber = await Barber.create(generateBarber());
        const res = await request(app).delete(`/barbers/${barber.id}`)
        expect(res.status).toBe(200);
      });
      test("500 faield delete barbers", async () => {
        const barber = await Barber.create(generateBarber());
        jest.spyOn(Barber, 'destroy').mockRejectedValue(new Error('test error'));
        const res = await request(app)
          .delete("/barbers/1")
        expect(res.status).toBe(500)
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

