import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';

import db from '@/db';

import { Dex, DexInput } from './Dex.types';

@Resolver()
class DexResolver {
  @Query(() => Dex)
  async dex(@Arg('id') id: number) {
    const dex = await db.dex.findUnique({ where: { id } });

    return dex;
  }

  @Query(() => [Dex])
  async dexes() {
    const dexes = await db.dex.findMany();

    return dexes;
  }

  @Mutation(() => Dex)
  async addDex(@Arg('dexData') dexData: DexInput) {
    const dex = await db.dex.create({
      data: dexData,
    });

    return dex;
  }
}

export default DexResolver;
