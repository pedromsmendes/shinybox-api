import type { Response } from 'express';
import type { RequestUser } from '@/server/types';
import type { Role, User } from '@prisma/client';

export interface ApolloContext {
  req: RequestUser;
  res: Response;
  token?: string;
  user?: User & { role: Role };
  ip?: string;
  language?: string;
}
