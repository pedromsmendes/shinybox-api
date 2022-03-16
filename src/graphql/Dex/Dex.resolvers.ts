import {
  Arg, FieldResolver, Int, Mutation, Query, Resolver, Root,
} from 'type-graphql';

import db from '@/db';

import { Dex, DexCreate, DexUpdate } from './Dex.types';

@Resolver(() => Dex)
class DexResolver {
  @Query(() => Dex, { nullable: true })
  async dex(@Arg('id') id: number) {
    const dex = await db.dex.findUnique({ where: { id } });

    return dex;
  }

  @Query(() => [Dex])
  async dexes() {
    const dexes = await db.dex.findMany();

    return dexes;
  }

  @FieldResolver()
  async pokemons(@Root() dex: Dex) {
    const pokemons = await db.pokemonDex.findMany({
      where: { dexId: dex.id },
      include: { pokemon: true },
    });

    return pokemons;
  }

  @Mutation(() => Dex, { nullable: true })
  async createDex(@Arg('data') data: DexCreate) {
    const dex = await db.dex.create({
      data,
    });

    return dex;
  }

  @Mutation(() => Dex, { nullable: true })
  async updateDex(@Arg('data') data: DexUpdate) {
    const dex = await db.dex.update({
      where: { id: data.id },
      data,
    });

    return dex;
  }

  @Mutation(() => Int)
  async removeDexes(@Arg('ids', () => [Int]) ids: number[]) {
    const { count } = await db.dex.deleteMany({ where: { id: { in: ids } } });

    return count;
  }
}

export default DexResolver;
