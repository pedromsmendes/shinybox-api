import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { type Express } from 'express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { GraphQLUpload, graphqlUploadExpress, Upload } from 'graphql-upload';

import { GQL_PATH, IN_DEV, IN_TEST } from '@/globals';

import type { ApolloContext } from './types';

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
    context: ({ req, res }: ApolloContext): ApolloContext => ({
      req,
      res,
      user: req.user,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress!,
      language: 'en',
    }),
  });

  await server.start();

  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app, path: GQL_PATH });
};

export default graphql;
