import type { Prisma } from '@prisma/client';

import {
  API_CLIENT_FRONTEND_ID, API_CLIENT_FRONTEND_SECRET,
  API_CLIENT_MOBILE_ID, API_CLIENT_MOBILE_SECRET,
} from '@/globals';

import db from '..';

const apiClient = async () => {
  const apiClientsToCreate: Prisma.ApiClientCreateManyInput[] = [];

  if (!(await db.apiClient.findUnique({ where: { id: API_CLIENT_FRONTEND_ID } }))) {
    apiClientsToCreate.push({
      id: API_CLIENT_FRONTEND_ID,
      secret: API_CLIENT_FRONTEND_SECRET,
      scope: 'FRONTEND',
    });
  }

  if (!(await db.apiClient.findUnique({ where: { id: API_CLIENT_MOBILE_ID } }))) {
    apiClientsToCreate.push({
      id: API_CLIENT_MOBILE_ID,
      secret: API_CLIENT_MOBILE_SECRET,
      scope: 'MOBILE',
    });
  }

  await db.apiClient.createMany({ data: apiClientsToCreate });
};

export default apiClient;
