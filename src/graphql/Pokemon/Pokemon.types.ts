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
export class PokemonCreate {
  @Field({ nullable: false })
  name: string;

  @Field(() => [PokemonDexCreate])
  dexes: PokemonDexCreate[];
}

@InputType()
export class PokemonDexCreate {
  @Field(() => Int, { nullable: false })
  dexId: number;

  @Field(() => Int, { nullable: false })
  number: number;

  @Field({ nullable: false })
  name: string;
}

@InputType()
export class PokemonUpdate {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => [PokemonDexCreate], { nullable: true })
  dexes?: PokemonDexUpdate[];
}

@InputType()
export class PokemonDexUpdate {
  @Field(() => Int, { nullable: true })
  dexId: number;

  @Field(() => Int, { nullable: true })
  number: number;

  @Field({ nullable: true })
  name: string;
}
