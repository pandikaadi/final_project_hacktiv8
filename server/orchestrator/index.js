const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type User {
    _id: String
    id: ID
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    createdAt: String
    updatedAt: String
    lat: String
    long: String
  }

  type Barber {
    id: ID
    name: String
    email: String
    password: String
    role: String
    phoneNumber: String
    createdAt: String
    updatedAt: String
    lat: String
    long: String
  }

  type Order {
    id: ID
    barberId: Int
    userId: Int
    serviceId: Int
    date: String
    hour: String
    orderKey: String
    statusPayment: Boolean
    statusBarber: String
    statusOrder: Boolean
    createdAt: String
    updatedAt: String
  }
  type Service {
    id: ID
    name: String
    price: Int
  }

  type LogInResponse {
    access_token: String
    error: String
  }

  input newUser {
    username: String
    email: String
    password: String
    phoneNumber: String
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID): User
    getBarbers: [Barber]
    getBarberById(id: ID): Barber
    getOrders: [Order]
  }

  type Mutation {
    login(email: String, password: String): LogInResponse
  }
`;
const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await axios({
          method: "GET",
          url: "http://localhost:5002/users",
        });
        if (users) {
          return users.data;
        }
      } catch (err) {
        return err;
      }
    },
    getUserById: async (_, args) => {
      try {
        const user = await axios({
          method: "GET",
          url: `http://localhost:5002/users/${args.id}`,
        });
        if (user) {
          return user.data;
        }
      } catch (err) {
        return err;
      }
    },
    getBarbers: async () => {
      try {
        const barbers = await axios({
          method: "GET",
          url: "http://localhost:5001/barbers",
        });
        if (barbers) {
          return barbers.data;
        }
      } catch (err) {
        return err;
      }
    },
    getBarberById: async (_, args) => {
      try {
        const barber = await axios({
          method: "GET",
          url: `http://localhost:5001/barbers/${args.id}`,
        });
        if (barber) {
          return barber.data;
        }
      } catch (err) {
        return err;
      }
    },
    getOrders: async () => {
      try {
        const orders = await axios({
          method: "GET",
          url: "http://localhost:5001/orders",
          headers: {},
        });
        if (orders) {
          return orders.data;
        }
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    login: async (_, args) => {
      const { email, password } = args;
      try {
        const user = await axios({
          method: "POST",
          url: "http://localhost:5001/login",
          data: args,
        });
        if (user) {
          console.log(user.data.access_token);
          return user.data;
        }
      } catch (err) {
        return err;
      }
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
