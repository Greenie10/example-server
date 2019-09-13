const { ApolloServer, gql } = require("apollo-server");
require("./config");

const { Question } = require("./models");

const typeDefs = gql`
  type Question {
    id: ID!
    Question: String
    Location: String
  }

  type Query {
    getQuestions: [Question]
  }

  type Mutation {
    addQuestion(Question: String!, Location: String!): Question
  }
`;

const resolvers = {
  Query: {
    getQuestions: async () => await Question.find({}).exec()
  },
  Mutation: {
    addQuestion: async (_, args) => {
      try {
        let response = await Question.create(args);
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
