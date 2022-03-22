import * as yup from 'yup';

import type { User } from '@prisma/client';

type SchemaUser = Partial<Record<keyof User, any>>;

export const userCreateSchema = yup.object().shape<SchemaUser>({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  roleId: yup.string().uuid().notRequired().nullable(),
  name: yup.string().notRequired().nullable(),
  avatar: yup.string().notRequired().nullable(),
});

export const userUpdateSchema = yup.object().shape<SchemaUser>({
  email: yup.string().email().notRequired(),
  password: yup.string().min(6).notRequired(),
  roleId: yup.string().uuid().notRequired().nullable(),
  name: yup.string().notRequired().nullable(),
  avatar: yup.string().notRequired().nullable(),
});
