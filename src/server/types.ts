import type { Request } from 'express';
import type { IncomingHttpHeaders } from 'http';
import type { Role, User } from '@prisma/client';

// For some reason x-fowarded-for is missing from the IncomingHttpHeaders interface
interface CustomIncomingHttpHeaders extends IncomingHttpHeaders {
  'x-forwarded-for'?: string;
}

export interface RequestUser extends Request {
  token?: string;
  user?: User & { role: Role };
  headers: CustomIncomingHttpHeaders;
}
