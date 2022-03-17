import 'reflect-metadata';

import { API_PORT } from '@/globals';
import express from '@/server';

import { initialData } from './db';
import graphql from './graphql';

const main = async () => {
  await initialData();

  await graphql(express);

  express.listen(API_PORT, '0.0.0.0', () => {
    console.info('Server listening on ', API_PORT);
  });
};

main()
  .catch((PROGRAM_ERROR) => {
    console.trace(PROGRAM_ERROR);
  });
