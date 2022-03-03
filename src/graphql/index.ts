import { type Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { buildSchema } from 'type-graphql';

import { GQL_PATH, IN_DEV, IN_TEST } from '@/globals';

const graphql = async (app: Express) => {
  const schema = await buildSchema({
    resolvers: [`${__dirname}/**/*.{types,resolvers}.ts`],
    emitSchemaFile: IN_TEST,
    dateScalarMode: 'isoDate',
  });

  const server = new ApolloServer({
    schema,
    introspection: IN_DEV,
    plugins: IN_DEV ? [ApolloServerPluginLandingPageGraphQLPlayground] : [],
  });

  await server.start();

  server.applyMiddleware({ app, path: GQL_PATH });
};

export default graphql;
