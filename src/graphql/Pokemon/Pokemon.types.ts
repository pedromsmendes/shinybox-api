import {
  Field, InputType, Int, ObjectType,
} from 'type-graphql';

import { PokemonDex } from '../PokemonDex/PokemonDex.types';

@ObjectType()
export class Pokemon {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field(() => [PokemonDex])
  dexes: PokemonDex[];

  @Field({ nullable: false })
  createdAt: Date;

  @Field({ nullable: false })
  updatedAt: Date;
}

@InputType()
export class PokemonDexInput {
  @Field(() => Int, { nullable: false })
  dexId: number;

  @Field(() => Int, { nullable: false })
  number: number;

  @Field({ nullable: false })
  pokemonName: string;
}

@InputType()
export class PokemonInput {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: false })
  name: string;

  @Field(() => [PokemonDexInput])
  dexes: PokemonDexInput[];
}
