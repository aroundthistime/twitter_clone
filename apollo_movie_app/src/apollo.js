import ApolloClient from "apollo-boost";

const URL = "http://localhost:4000/";

const client = new ApolloClient({
    uri : URL,
    onError : ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
      }
});

export default client;