import {
  Field, Int, ObjectType,
} from 'type-graphql';

import { Pokemon } from '../Pokemon/Pokemon.types';

@ObjectType()
export class PokemonDex {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => Int, { nullable: false })
  number: number;

  @Field({ nullable: false })
  name: string;

  @Field()
  pokemon: Pokemon;

  @Field(() => Int, { nullable: false })
  pokemonId: number;

  @Field()
  dex: Pokemon;

  @Field(() => Int, { nullable: false })
  dexId: number;

  @Field({ nullable: false })
  createdAt: Date;

  @Field({ nullable: false })
  updatedAt: Date;
}

export class PokemonDexInput {

}
