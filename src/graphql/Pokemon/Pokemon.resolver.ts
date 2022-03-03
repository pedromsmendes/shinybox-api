import {
  Arg, Mutation, Query, Resolver,
} from 'type-graphql';

import db from '@/db';

import { Pokemon, PokemonInput } from './Pokemon.types';

@Resolver(Pokemon)
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

  @Mutation(() => Pokemon)
  async addPokemon(@Arg('pokemonData') pokemonData: PokemonInput): Promise<Pokemon> {
    const pokemon = await db.pokemon.create({
      data: pokemonData,
      include: {
        dexes: true,
      },
    });

    return pokemon;
  }
}

export default PokemonResolver;
