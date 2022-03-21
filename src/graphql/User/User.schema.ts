import * as yup from 'yup';

import type { User } from '@prisma/client';

type SchemaUser = Partial<Record<keyof User, any>>;

export const userCreateSchema = yup.object().shape<SchemaUser>({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  roleId: yup.string().uuid().required(),
  name: yup.string(),
  avatar: yup.string(),
});

export const userUpdateSchema = yup.object().shape<SchemaUser>({
  email: yup.string().email(),
  password: yup.string().min(6),
  roleId: yup.string().uuid(),
  name: yup.string(),
  avatar: yup.string(),
});
