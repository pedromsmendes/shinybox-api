import 'reflect-metadata';

import { API_PORT } from '@/globals';
import express from '@/server';

import graphql from './graphql';
import { addRoutes } from './server/server';

const main = async () => {
  await graphql(express);

  addRoutes();

  express.listen(API_PORT, () => {
    console.log('Server listening on ', API_PORT);
  });
};

main()
  .catch((PROGRAM_ERROR) => {
    console.trace(new Error(PROGRAM_ERROR));
  });
