import type { Prisma } from '@prisma/client';
import db from '..';

const users = async () => {
  const usersToCreate: Prisma.UserCreateManyInput[] = [];

  const adminRole = await db.role.findFirst({ where: { code: 'ADMIN' } });

  if (!adminRole) {
    throw new Error("Can't find admin role to create default admin user");
  }

  const adminUser = {
    email: 'admin@mail.com',
    password: '12345',
    roleId: adminRole.id,
    name: 'Admin',
  };

  const adminUserFound = await db.user.findUnique({ where: { email: adminUser.email } });

  if (!adminUserFound) {
    usersToCreate.push(adminUser);
  }

  const userRole = await db.role.findFirst({ where: { code: 'USER' } });

  if (!userRole) {
    throw new Error("Can't find user role to create default user");
  }

  const user = {
    email: 'user@mail.com',
    password: '12345',
    roleId: userRole.id,
    name: 'User',
  };

  const userFound = await db.user.findUnique({ where: { email: user.email } });

  if (!userFound) {
    usersToCreate.push(user);
  }

  await db.user.createMany({ data: usersToCreate });
};

export default users;
