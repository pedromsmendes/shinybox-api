import {
  Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root,
} from 'type-graphql';

import { createWriteStream, unlinkSync } from 'fs';
import { finished } from 'stream/promises';

import db from '@/db';

import { Auth } from '@/tools/Decorators';
import validateYup from '@/tools/validation/yup';

import { User, UserCreate, UserUpdate } from './User.types';
import { userCreateSchema, userUpdateSchema } from './User.schema';
import { Role } from '../Role/Role.types';

import { ApolloContext } from '../types';
import { ALLOWED_IMG_UPLOADS } from '@/globals';
import mkdirp from 'mkdirp';
import { PassThrough } from 'stream';
import imgUpload from './helpers/imgUpload';

@Resolver(() => User)
class UserResolver {
  @Auth({ admin: true })
  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string) {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  }

  @Auth({ admin: true })
  @Query(() => [User])
  async users() {
    const users = await db.user.findMany();

    return users;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { user }: ApolloContext) {
    if (!user) { return null; }

    return user;
  }

  @FieldResolver(() => Role, { nullable: true })
  async role(@Root() user: User) {
    const userRole = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    return userRole?.role || null;
  }

  @Auth()
  @Mutation(() => User, { nullable: true })
  async createUser(@Arg('data') data: UserCreate) {
    await validateYup(userCreateSchema, data);

    const { avatar, ...restData } = data;

    const user = await db.user.create({ data: restData });

    return user;
  }

  @Auth()
  @Mutation(() => User, { nullable: true })
  async updateUser(@Arg('data') data: UserUpdate, @Arg('id') id: string) {
    await validateYup(userUpdateSchema, data);

    const { avatar, ...restData } = data;

    const user = await db.user.update({
      where: { id },
      data: restData,
    });

    if (avatar && user.id) {
      const dir = `pokemon/${user.id}`;
      const avatarFileName = await imgUpload(avatar, dir);

      await db.user.update({
        where: { id },
        data: { avatar: `${dir}/${avatarFileName}` },
      });
    }

    return user;
  }

  @Auth({ admin: true })
  @Mutation(() => Int)
  async removeUsers(@Arg('ids', () => [String]) ids: string[]) {
    const { count } = await db.user.deleteMany({ where: { id: { in: ids } } });

    return count;
  }
}

export default UserResolver;
