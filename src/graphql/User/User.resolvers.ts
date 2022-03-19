import {
  Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root,
} from 'type-graphql';

import db from '@/db';

import { Auth } from '@/tools/Decorators';

import { User } from './User.types';
import { Role } from '../Role/Role.types';

import { ApolloContext } from '../types';

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

  @Auth({ admin: true })
  @Mutation(() => Int)
  async removeUsers(@Arg('ids', () => [String]) ids: string[]) {
    const { count } = await db.user.deleteMany({ where: { id: { in: ids } } });

    return count;
  }
}

export default UserResolver;
