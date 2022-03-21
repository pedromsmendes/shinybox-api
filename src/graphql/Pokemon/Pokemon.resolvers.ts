import {
  Arg, FieldResolver, Int, Mutation, Query, Resolver, Root,
} from 'type-graphql';

import db from '@/db';

import { Auth } from '@/tools/Decorators';

import { Pokemon, PokemonCreate, PokemonUpdate } from './Pokemon.types';

@Resolver(() => Pokemon)
class PokemonResolver {
  @Query(() => Pokemon, { nullable: true })
  async pokemon(@Arg('id') id: string) {
    const pokemon = await db.pokemon.findUnique({ where: { id } });

    return pokemon;
  }

  @Query(() => [Pokemon])
  async pokemons() {
    const pokemons = await db.pokemon.findMany();

    return pokemons;
  }

  @FieldResolver()
  async dexes(@Root() pokemon: Pokemon) {
    const dexes = await db.pokemonDex.findMany({
      where: { pokemonId: pokemon.id },
      include: { dex: true },
    });

    return dexes;
  }

  @Auth({ admin: true })
  @Mutation(() => Pokemon, { nullable: true })
  async createPokemon(@Arg('data') data: PokemonCreate) {
    const validDexes = await Promise.all(
      data.dexes.filter((dex) => (
        db.dex.findUnique({ where: { id: dex.dexId } })
          .then((validDex) => !!validDex)
      )),
    );

    if (!validDexes.length) {
      console.log('error, no dex, pokemon should have a dex');
      return null;
    }

    const pokemon = await db.pokemon.create({
      data: {
        name: data.name,
        dexes: {
          create: validDexes.map((dex) => ({
            name: dex.name,
            number: dex.number,
            dexId: dex.dexId,
          })),
        },
      },
    });

    return pokemon;
  }

  @Auth({ admin: true })
  @Mutation(() => Pokemon, { nullable: true })
  async updatePokemon(@Arg('data') data: PokemonUpdate, @Arg('id') id: string) {
    // checking if sent dexes are valid
    const validDexes = await Promise.all(
      (data.dexes || []).filter((dex) => (
        db.dex.findUnique({ where: { id: dex.dexId } })
          .then((validDex) => !!validDex)
      )),
    );

    if (Array.isArray(data.dexes) && !validDexes.length) {
      console.log('error, no dex, pokemon should have a dex');
      return null;
    }

    if (Array.isArray(data.dexes)) {
      await db.pokemonDex.deleteMany({ where: { pokemonId: id } });
    }

    const pokemon = await db.pokemon.update({
      where: { id },
      data: {
        name: data.name,
        ...(Array.isArray(data.dexes) ? {
          dexes: {
            create: validDexes.map((dex) => ({
              name: dex.name,
              number: dex.number,
              dexId: dex.dexId,
            })),
          },
        } : {}),
      },
    });

    return pokemon;
  }

  @Auth({ admin: true })
  @Mutation(() => Int)
  async removePokemons(@Arg('ids', () => [String]) ids: string[]) {
    const { count } = await db.pokemon.deleteMany({ where: { id: { in: ids } } });

    return count;
  }
}

export default PokemonResolver;
