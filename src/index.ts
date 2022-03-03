import 'reflect-metadata';

import { API_PORT } from '@/globals';
import express from '@/server';

const main = async () => {
  express.listen(API_PORT, () => {
    console.log('Server listening on ', API_PORT);
  });
};

main()
  .catch((PROGRAM_ERROR) => {
    console.trace(new Error(PROGRAM_ERROR));
  });
