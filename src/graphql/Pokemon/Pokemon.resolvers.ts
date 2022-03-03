import {
  Arg, FieldResolver, Int, Mutation, Query, Resolver, Root,
} from 'type-graphql';

import db from '@/db';

import { Pokemon, PokemonInput } from './Pokemon.types';

@Resolver(() => Pokemon)
class PokemonResolver {
  // constructor(private pokemonService: PokemonService) { }

  @Query(() => Pokemon)
  async pokemon(@Arg('id') id: number) {
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

  @Mutation(() => Pokemon)
  async addPokemon(@Arg('data') data: PokemonInput) {
    const missingDexes: number[] = [];
    const dexesToAssociate: PokemonInput['dexes'] = [];

    data.dexes.forEach(async (dex) => {
      const validDex = await db.dex.findUnique({ where: { id: dex.dexId } });

      if (!validDex) {
        missingDexes.push(dex.dexId);
      } else {
        dexesToAssociate.push(dex);
      }
    });

    const pokemon = await db.pokemon.create({
      data: {
        id: data.id,
        name: data.name,
        // dexes: {
        //   connectOrCreate: dexesToAssociate.map((dex) => ({
        //     create: {
        //       name: dex.pokemonName,
        //       number: dex.number,
        //       dexId: dex.dexId,
        //     },
        //     where: {
        //       id: data.id,
        //     },
        //   })),
        // },
      },
    });

    console.log('🚀 ~ PokemonResolver ~ addPokemon ~ pokemon', pokemon);
    const allRelations = await db.pokemonDex.findMany();
    console.log('🚀 ~ PokemonResolver ~ addPokemon ~ allRelations', allRelations);

    return pokemon;
  }

  @Mutation(() => Int)
  async removePokemons(@Arg('ids', () => [Int]) ids: number[]) {
    const { count } = await db.pokemon.deleteMany({ where: { id: { in: ids } } });

    return count;
  }
}

export default PokemonResolver;
