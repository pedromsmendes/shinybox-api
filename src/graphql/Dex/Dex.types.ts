import {
  Field, InputType, ObjectType,
} from 'type-graphql';

import { PokemonDex } from '../PokemonDex/PokemonDex.types';

@ObjectType()
export class Dex {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  name: string;

  @Field(() => [PokemonDex])
  pokemons: PokemonDex[];

  @Field({ nullable: false })
  createdAt: Date;

  @Field({ nullable: false })
  updatedAt: Date;
}

@InputType()
export class DexCreate {
  @Field({ nullable: false })
  name: string;
}

@InputType()
export class DexUpdate {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: true })
  name?: string;
}
