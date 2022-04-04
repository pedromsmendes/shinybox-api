import {
  Field, InputType, Int, ObjectType, registerEnumType,
} from 'type-graphql';

import { PokemonDex } from '../PokemonDex/PokemonDex.types';
import { Pagination, Sort } from '../_Globals/Globals.types';

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

export enum PokemonOrderField {
  Name = 'name',
  CreatedAt = 'createdAt',
}

registerEnumType(PokemonOrderField, {
  name: 'PokemonOrderField',
  description: 'Order fields for pokemons',
});

@InputType()
export class PokemonOrder {
  @Field(() => Sort!, { nullable: false })
  sortOrder: Sort;

  @Field(() => PokemonOrderField!, { nullable: false })
  field: PokemonOrderField;
}

@InputType()
export class PokemonsOptions {
  @Field(() => Pagination, { nullable: true })
  pagination?: Pagination;

  @Field(() => [PokemonOrder!], { nullable: true })
  orderBy?: PokemonOrder[];
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

  @Field(() => Int!, { nullable: false })
  count: number;

  // @Field(() => PageInfo!, { nullable: false })
  // pageInfo: PageInfo;
}

@InputType()
export class PokemonCreate {
  @Field({ nullable: false })
  name: string;

  @Field(() => [PokemonDexCreate!]!)
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

  @Field(() => [PokemonDexCreate!], { nullable: true })
  dexes?: PokemonDexCreate[];
}
