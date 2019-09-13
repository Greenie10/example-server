const { ApolloServer, gql } = require("apollo-server");
require("./config");

const { User } = require("./models");

const typeDefs = gql`
  type User {
    id: ID!
    Name: String
    Email: String
  }

  type Query {
    getNames: [User]
  }

  type Mutation {
    addUser(Name: String!, Email: String!): User
  }
`;

const resolvers = {
  Query: {
    getNames: async () => await User.find({}).exec()
  },
  Mutation: {
    addName: async (_, args) => {
      try {
        let response = await User.create(args);
        return response;
      } catch (e) {
        return e.message;
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
