import { Prisma } from '@prisma/client';
import { Pagination, Sort } from './_Globals/Globals.types';

type OrderBy = {
  sortOrder: Sort;
  field: any;
};

type Options = {
  pagination?: Pagination;
  orderBy?: OrderBy[];
}

type QueryArgs = {
  cursor?: {
    id: string;
  };
  orderBy?: Record<string, Prisma.SortOrder>;
  take?: number;
  skip?: number;
}

const optionsToPrisma = (options?: Options) => {
  const { pagination, orderBy } = options || {};

  const order = orderBy?.reduce<QueryArgs['orderBy']>((acc, item) => ({
    ...acc || {},
    [item.field]: item.sortOrder,
  }), {});

  const { after, first } = pagination || {};

  const queryArgs: QueryArgs = {
    ...(after ? {
      cursor: { id: after },
      skip: 1,
    } : {}),
    ...(first ? { take: first } : {}),
    ...((order && Object.keys(order).length) ? { orderBy: order } : {}),
  };

  return queryArgs;
};

export default optionsToPrisma;
