import {
  Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root,
} from 'type-graphql';

import db from '@/db';

import { User } from './User.types';
import { ApolloContext } from '../types';

@Resolver(() => User)
class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string) {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  }

  @Query(() => [User])
  async users() {
    const users = await db.user.findMany();

    return users;
  }

  @Query(() => User)
  me(@Ctx() { user }: ApolloContext) {
    if (!user) { return null; }

    return user;
  }

  @FieldResolver()
  async role(@Root() user: User) {
    const userRole = await db.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    return userRole?.role || null;
  }

  @Mutation(() => Int)
  async removeUsers(@Arg('ids', () => [String]) ids: string[]) {
    const { count } = await db.user.deleteMany({ where: { id: { in: ids } } });

    return count;
  }
}

export default UserResolver;
