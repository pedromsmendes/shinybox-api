import {
  Field, InputType, Int, ObjectType,
} from 'type-graphql';

import { PokemonDex } from '../PokemonDex/PokemonDex.types';
import { PageInfo } from '../_Globals/Globals.types';

@ObjectType()
export class Pokemon {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  name: string;

  @Field(() => [PokemonDex!]!)
  dexes: PokemonDex[];

  @Field({ nullable: false })
  createdAt: Date;

  @Field({ nullable: false })
  updatedAt: Date;
}

@ObjectType()
export class PokemonEdge {
  @Field(() => Pokemon!, { nullable: false })
  node: Pokemon;

  @Field({ nullable: false })
  cursor: string;
}

@ObjectType()
export class PokemonsConnection {
  @Field(() => [PokemonEdge!]!, { nullable: false })
  edges: PokemonEdge[];

  @Field(() => PageInfo, { nullable: false })
  pageInfo: PageInfo;
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
  @Field({ nullable: false })
  dexId: string;

  @Field(() => Int!, { nullable: false })
  number: number;

  @Field({ nullable: false })
  name: string;
}

@InputType()
export class PokemonUpdate {
  @Field({ nullable: true })
  name?: string;

  @Field(() => [PokemonDexCreate], { nullable: true })
  dexes?: PokemonDexUpdate[];
}

@InputType()
export class PokemonDexUpdate {
  @Field({ nullable: true })
  dexId: string;

  @Field(() => Int, { nullable: true })
  number: number;

  @Field({ nullable: true })
  name: string;
}
