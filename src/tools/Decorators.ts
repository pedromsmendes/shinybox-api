import { AuthenticationError, ForbiddenError } from 'apollo-server-core';
import { createMethodDecorator, type MiddlewareFn } from 'type-graphql';

import type { ApolloContext } from '@/graphql/types';

const checkAuth = (params?: AuthParams): MiddlewareFn<ApolloContext> => (apolloParams, next) => {
  const { user } = apolloParams.context;

  // mutation / query
  // when it's a field resolver, we might need to send it as a flag in the params
  // const type = apolloParams.info.operation.operation;

  if (!user || !user.role) {
    throw new AuthenticationError('Not authenticated. Authentication required');
  }

  if (params?.admin && !user.role.isAdmin) {
    throw new ForbiddenError('Not authorized to access this resource');
  }

  return next();
};

type AuthParams = {
  admin?: boolean;
  field?: boolean;
};

// eslint-disable-next-line import/prefer-default-export
export const Auth = (params?: AuthParams): MethodDecorator => (
  createMethodDecorator(checkAuth(params))
);
