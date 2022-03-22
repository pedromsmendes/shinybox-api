import * as yup from 'yup';

import type { Dex } from '@prisma/client';

type SchemaDex = Partial<Record<keyof Dex, any>>;

export const dexCreateSchema = yup.object().shape<SchemaDex>({
  name: yup.string().required(),
});

export const dexUpdateSchema = yup.object().shape<SchemaDex>({
  name: yup.string().notRequired(),
});
