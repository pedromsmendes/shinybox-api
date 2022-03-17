import {
  Field, Int, ObjectType,
} from 'type-graphql';

import { Pokemon } from '../Pokemon/Pokemon.types';
import { Dex } from '../Dex/Dex.types';

@ObjectType()
export class PokemonDex {
  @Field({ nullable: false })
  id: string;

  @Field(() => Int, { nullable: false })
  number: number;

  @Field({ nullable: false })
  name: string;

  @Field(() => Pokemon)
  pokemon: Pokemon;

  @Field({ nullable: false })
  pokemonId: string;

  @Field(() => Dex)
  dex: Dex;

  @Field({ nullable: false })
  dexId: string;

  @Field({ nullable: false })
  createdAt: Date;

  @Field({ nullable: false })
  updatedAt: Date;
}

export class PokemonDexInput {

}
