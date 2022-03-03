import {
  Field, Int, ObjectType,
} from 'type-graphql';

import { PokemonDex } from '../PokemonDex/PokemonDex.types';

@ObjectType()
export class Dex {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field()
  pokemons: PokemonDex[];

  @Field({ nullable: false })
  createdAt: Date;

  @Field({ nullable: false })
  updatedAt: Date;
}

export class DexInput {

}
