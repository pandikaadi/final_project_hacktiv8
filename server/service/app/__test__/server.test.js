const app = require('../../app')
const request = require('supertest')
const { User,Service,Barber,Order } = require('../../../service/app/models')
const { createToken} = require("../../../service/app/helpers/jwt")

const userTest ={
  username:"anggorego",
  email:"anggorego124@gmail.com",
  password:"testing",
  phoneNumber:"0821232323"
}
const userTestLogin={
  email:"anggorego124@gmail.com",
  password:"testing",
}

const orderTest = {
  userId:1,
  barberId : 1,
  serviceId:1,
  date: "22/12/2022",
  hour: "19.00",
  lat:'-6.7092',
  long:'106.88188'

}

const barberTest = {
  name:"lebron james",
  email:"lebron.james@gmail.com",
  password:"testing",
  phoneNumber:"0821232323"
}

const ServiceTest = {
  name : 'basic cut',
  price: 100000,

}

let token ;
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIwMUBtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2MjI2MDk2NTF9.gShAB2qaCUjlnvNuM1MBWfBVEjDGdqjWSJNMEScXIeE';


beforeAll((done) => {
  Promise.all([User.create(userTest),Service.create(ServiceTest),Barber.create(barberTest),]) 
  .then((datas)=>{
    token = createToken({
      id: datas[0].id,
      email: datas[0].email,
      role: datas[0].role,
    })
    Order.create(orderTest)
    done()
  })
  .catch(err=>{
    done(err)
  })

});
afterAll(done=>{
  Promise.all([User.destroy({ truncate: true, cascade: true, restartIdentity: true}),Service.destroy({ truncate: true, cascade: true, restartIdentity: true})])
  User.destroy({ truncate: true, cascade: true, restartIdentity: true},Barber.destroy({ truncate: true, cascade: true, restartIdentity: true}),
  Order.destroy({ truncate: true, cascade: true, restartIdentity: true}))
  .then(_=>{
    done()
  })
  .catch(err => {
    done(err)
  })
 
})

describe('user routes test', ()=>{
  describe('POST /register - create new user',()=>{
    describe('succes register test',()=>{
      test('201 Success register - should create new User',(done)=>{
        request(app)
        .post('/register')
        .send(userTest)
        .end((err,res)=>{
          if (err) return done(err);
          const { body, status } = res;
  
          expect(status).toBe(201);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('email', userTest.email);
          return done();
        })
      })
    })
    describe('failed resgister test', ()=>{
      test('400 Failed register - should return error if email is null', (done) => {
        request(app)
          .post('/register')
          .send({
            username:"anggorego",
            password:"testing",
            phoneNumber:"0821232323"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Email is required');
            return done();
          });
      });
      test('400 Failed register - should return error if username is null', (done) => {
        request(app)
          .post('/register')
          .send({
            email:"anggorego124@gmail.com",
            password:"testing",
            phoneNumber:"0821232323"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Username is required');
            return done();
          });
      });
      test('400 Failed register - should return error if password is null', (done) => {
        request(app)
          .post('/register')
          .send({
            username: "anggorego",
            email:"anggorego124@gmail.com",
            phoneNumber:"0821232323"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Password is required');
            return done();
          });
      });
      test('400 Failed register - should return error if Phone Number is null', (done) => {
        request(app)
          .post('/register')
          .send({
            username: "anggorego",
            email:"anggorego124@gmail.com",
            password: " testing",
           
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Phone Number is required');
            return done();
          });
      });
      test('400 Failed register - should return error if username is empty', (done) => {
        request(app)
          .post('/register')
          .send({
            username:"",
            email:"anggorego124@gmail.com",
            password:"testing",
            phoneNumber:"0821232323"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Username is required');
            return done();
          });
      });
      test('400 Failed register - should return error if email is empty', (done) => {
        request(app)
          .post('/register')
          .send({
            username:"anggorego",
            email:"",
            password:"testing",
            phoneNumber:"0821232323"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Email is required');
            return done();
          });
      });
      test('400 Failed register - should return error if password is empty', (done) => {
        request(app)
          .post('/register')
          .send({
            username:"anggorego",
            email:"anggorego124@gmail.com",
            password:"",
            phoneNumber:"0821232323"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Password is required');
            return done();
          });
      });
      test('400 Failed register - should return error if phone number is empty', (done) => {
        request(app)
          .post('/register')
          .send({
            username:"anggorego",
            email:"anggorego124@gmail.com",
            password:"testing",
            phoneNumber:""
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Phone Number is required');
            return done();
          });
      });
    })
  })
  describe('POST /login - success test',()=>{
    test('200 Success login - should return access_token', (done) => {
      request(app)
        .post('/login')
        .send(userTestLogin)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty('access_token', expect.any(String));
          return done();
        });
    });

  })
  describe('POST /login - failed test', ()=>{
    test('401 Failed login - should return error when user not found', (done) => {
      request(app)
        .post('/login')
        .send({
          email: 'salah@mail.com',
          password: 'salah',
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty('message', 'Invalid email/password');
          return done();
        });
    });
    test('401 Failed login - should return error when incorrect password', (done) => {
      request(app)
        .post('/login')
        .send({
          email: 'anggorego124@gmail.com',
          password: 'testings',
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty('message', 'Invalid email/password');
          return done();
        });
    });
  })
})

describe('order rouets test', ()=>{
  describe('POST /orders', ()=>{
      describe('succes create order',()=>{
        test('201 Success create order - should create new Order',(done)=>{
          request(app)
          .post('/orders')
          .set('access_token', token)
          .send(orderTest)
          .end((err,res)=>{
            if (err) return done(err);
            const { body, status } = res;
    
            expect(status).toBe(201);
            expect(body).toEqual(expect.any(Object));
            return done();
          })
        })
      })
      describe('failed create order',()=>{
        test('400 failed create order - should return error if barberId is Empty',(done)=>{
          request(app)
          .post('/orders')
          .set('access_token', token)
          .send({
            userId:1,
            barberId : 0,
            date: "22/12/2022",
            hour: " 19.00"
          })
          .end((err,res)=>{
            if (err) return done(err);
            const { body, status } = res;
    
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'bad request');
            return done();
          })
        })
        test('400 failed create order - should return error if date is Empty',(done)=>{
          request(app)
          .post('/orders')
          .set('access_token', token)
          .send({
            userId:1,
            barberId : 0,
            date: "",
            hour: " 19.00"
          })
          .end((err,res)=>{
            if (err) return done(err);
            const { body, status } = res;
    
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'date is required');
            return done();
          })
        })
        test('400 failed create order - should return error if hour is Empty',(done)=>{
          request(app)
          .post('/orders')
          .set('access_token', token)
          .send({
            userId:1,
            barberId : 1,
            date: "22/12/2022",
            hour: ""
          })
          .end((err,res)=>{
            if (err) return done(err);
            const { body, status } = res;
    
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'hour is required');
            return done();
          })
        })
      })
  })
  describe('GET /orders',()=>{
    test('200 Success orders', (done) => {
      request(app)
        .get('/orders')
        .set('access_token', token)
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
    test('401 failed get orders with invalid token', (done) => {
      request(app)
        .get('/orders')
        .set('access_token', invalidToken)
        .then((response) => {
          const { body, status } = response;
  
          expect(status).toBe(401);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty('message',"invalid signature");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  })
  describe('GET /orders/:id',()=>{
    test('200 Success get order by id', (done) => {
      request(app)
        .get('/orders/1')
        .set('access_token', token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty('id', expect.any(Number));
          done();
        })
        .catch((err) => {
          done(err);
        });
    })
  })
  describe('DELETE /orders/:id', () => {
    test('200 Success delete order by id', (done) => {
      request(app)
        .delete('/orders/1')
        .set('access_token', token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    })
    test('404 failed delete order by id', (done) => {
      request(app)
        .delete('/orders/1')
        .set('access_token', token)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(404);
          done();
        })
        .catch((err) => {
          done(err);
        });
    })
  })
  

})

describe('barber routes test',()=>{
  describe('POST /barbers', ()=>{
    describe('success create barber',()=>{
      test('201 Success add barber - should add new barber',(done)=>{
        request(app)
        .post('/barbers')
        // .set('access_token', token)
        .send(barberTest)
        .end((err,res)=>{
          if (err) return done(err);
          const { body, status } = res;
          expect(status).toBe(201);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('name', barberTest.name);
          expect(body).toHaveProperty('email', barberTest.email);
          return done();
        })
      })
    })
    describe('failed create barber' , ()=>{
      test('400 Failed create - should return error if name is null', (done) => {
        request(app)
          .post('/barbers')
          .send({
            email:"lebron.james@gmail.com",
            password:"testing",
            phoneNumber:"0821232323"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Name is required');
            return done();
          });
      });
      test('400 Failed create - should return error if email is null', (done) => {
        request(app)
          .post('/barbers')
          .send({
            name: "lebron james",
            password:"testing",
            phoneNumber:"0821232323"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Email is required');
            return done();
          });
      });
      test('400 Failed create - should return error if password is null', (done) => {
        request(app)
          .post('/barbers')
          .send({
            name: "lebron james",
            email:"lebron.james@gmail.com",
            phoneNumber:"0821232323"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Password is required');
            return done();
          });
      });
      test('400 Failed create - should return error if phone number is null', (done) => {
        request(app)
          .post('/barbers')
          .send({
            name: "lebron james",
            email:" lebron.james@gmail.com",
            password:"testing",
            
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Phone Number is required');
            return done();
          });
      });
      test('400 Failed register - should return error if username is empty', (done) => {
        request(app)
          .post('/barbers')
          .send({
            name:"",
            email:"anggorego124@gmail.com",
            password:"testing",
            phoneNumber:"0821232323"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Name is required');
            return done();
          });
      });
      test('400 Failed register - should return error if email is empty', (done) => {
        request(app)
          .post('/barbers')
          .send({
            name:"anggorego",
            email:"",
            password:"testing",
            phoneNumber:"0821232323"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Email is required');
            return done();
          });
      });
      test('400 Failed register - should return error if password is empty', (done) => {
        request(app)
          .post('/barbers')
          .send({
            name:"anggorego",
            email:"anggorego124@gmail.com",
            password:"",
            phoneNumber:"0821232323"
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Password is required');
            return done();
          });
      });
      test('400 Failed register - should return error if phone number is empty', (done) => {
        request(app)
          .post('/barbers')
          .send({
            name:"anggorego",
            email:"anggorego124@gmail.com",
            password:"testing",
            phoneNumber:""
          })
          .end((err, res) => {
            if (err) return done(err);
            const { body, status } = res;
  
            expect(status).toBe(400);
            expect(body).toEqual(expect.any(Object));
            expect(body).toHaveProperty('message', 'Phone Number is required');
            return done();
          });
      });
    })
  })
  describe('GET /barbers', () => {
    test('200 Success get barbers', (done) => {
      request(app)
        .get('/barbers')
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
    test('200 Success get barbers by id', (done) => {
      request(app)
        .get('/barbers/1')
        .then((response) => {
          const { body, status } = response;
  
          expect(status).toBe(200);
          expect(body).toEqual(expect.any(Object));
          expect(body).toHaveProperty('id', expect.any(Number));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    
})
  describe('DELETE /barbers',()=>{
    test('200 Success delete barbers', (done) => {
      request(app)
        .delete('/barbers/1')
        .then((response) => {
          const { body, status } = response;
  
          expect(status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  })
})




