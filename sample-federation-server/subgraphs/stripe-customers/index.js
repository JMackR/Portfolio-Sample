const { ApolloServer, gql } = require('apollo-server')
const { readFileSync } = require('fs')
const typeDefs = gql(readFileSync('./src/customer.graphql', { encoding: 'utf-8' }))
const resolvers = require('./src/resolvers')
const StripeAPI = require('./src/data-sources/stripe-api')
const { buildSubgraphSchema } = require('@apollo/subgraph')

const port = process.env.APOLLO_PORT || 4000;
const isProduction = process.env.NODE_ENV === 'production';


async function main() {

  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers,
    }),
    dataSources: () => {
      return {
        StripeAPI: new StripeAPI(),
      }
    },
    context: ({ req }) => {
      return {
        authorization: req?.headers['authorization'] ?? '',
      };
    },
    cors: isProduction ? false : { origin: '*' },
  });

  await server
    .listen({ port: port })
    .then(({ url }) => console.log(`Subgraph ready at: ${url}`));
}

main();
