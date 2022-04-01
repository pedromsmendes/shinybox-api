import bcrypt from 'bcrypt';

import { Prisma } from '@prisma/client';

const user = async (params: Prisma.MiddlewareParams) => {
  if (params.model === 'User'
    && (params.action === 'create' || params.action === 'createMany' || params.action === 'update')
    && params.args?.data) {
    if (Array.isArray(params.args?.data)) {
      for (let i = 0; i < params.args.data.length; i++) {
        const user = params.args.data[i];

        if (user.password) {
          // eslint-disable-next-line no-await-in-loop
          user.password = await bcrypt.hash(user.password, 12);
        }
      }
    } else if (params.args?.data?.password) {
      // eslint-disable-next-line no-param-reassign
      params.args.data.password = await bcrypt.hash(params.args.data.password, 12);
    }
  }

  return params;
};

export default user;
