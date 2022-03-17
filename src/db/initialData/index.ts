import { IN_DEV, IN_TEST } from '@/globals';

import apiClient from './apiClient';
import roles from './roles';
import users from './users';

const initialData = async () => {
  console.info('- Creating initial data');

  await roles();

  if (IN_DEV || IN_TEST) {
    console.info('- Creating dev/test data');

    await apiClient();
    await users();
  }
};

export default initialData;
