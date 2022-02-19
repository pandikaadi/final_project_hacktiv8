import {
  ApolloClient,
  InMemoryCache,

} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://p3-ch2-server-orchestrator.herokuapp.com',
  cache: new InMemoryCache()
});

export default client