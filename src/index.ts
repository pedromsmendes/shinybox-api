import 'reflect-metadata';
import Express from 'express';

import { API_PORT } from '@/globals';
import express from '@/server';

import { initialData } from './db';
import graphql from './graphql';

import notFound from './server/routes/notFound';

const main = async () => {
  await initialData();

  await graphql(express);

  express.use(Express.static('public'));

  express.get('/*', notFound);

  // 0.0.0.0 force ipv4
  express.listen(API_PORT, '0.0.0.0', () => {
    console.info('Server listening on ', API_PORT);
  });
};

main()
  .catch((PROGRAM_ERROR) => {
    console.trace(PROGRAM_ERROR);
  });
