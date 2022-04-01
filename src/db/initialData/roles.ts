import type { Prisma } from '@prisma/client';
import db from '..';

const roles = async () => {
  const rolesToCreate: Prisma.RoleCreateManyInput[] = [];

  if (!(await db.role.findUnique({ where: { code: 'ADMIN' } }))) {
    rolesToCreate.push({
      name: 'Admin',
      code: 'ADMIN',
      isAdmin: true,
    });
  }

  if (!(await db.role.findUnique({ where: { code: 'USER' } }))) {
    rolesToCreate.push({
      name: 'User',
      code: 'USER',
    });
  }

  if (rolesToCreate.length) {
    await db.role.createMany({ data: rolesToCreate });
  }
};

export default roles;
