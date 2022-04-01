import { Prisma } from '@prisma/client';

import db from '../index';

const logActions: Prisma.PrismaAction[] = [
  'create',
  'createMany',
  'update',
  'updateMany',
  'upsert',
  'delete',
  'deleteMany',
]

const logs = async (params: Prisma.MiddlewareParams, result: any) => {
  if (params.model
    && params.model !== 'Log'
    && logActions.includes(params.action)) {

    await db.log.create({
      data: {
        action: params.action,
        model: params.model.toString(),
        args: params.args,
        result,
      }
    });
  }
};

export default logs;
