import {
  Field, InputType, Int,
  ObjectType, registerEnumType,
} from 'type-graphql';

export enum Code {
  BAD_USER_INPUT = 'badUserInput',
  WRONG_BINO = 'wrongBino',
}

registerEnumType(Code, {
  name: 'Code',
  description: 'The codes from the dang errors mang',
});

export enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(Sort, {
  name: 'Sort',
  description: 'Sorting',
});

@ObjectType()
export class GraphqlError {
  @Field({ nullable: false })
  message: string;

  @Field({ nullable: false })
  field: string;

  @Field(() => Code, { nullable: true })
  code?: Code;
}

@InputType()
export class Pagination {
  @Field(() => Int, { nullable: true })
  first?: number;

  @Field({ nullable: true })
  after?: string;
}

@ObjectType()
export class PageInfo {
  @Field(() => Int, { nullable: false })
  pageCount: number;

  @Field(() => Int, { nullable: false })
  totalCount: number;

  // @Field({ nullable: true })
  // nextCursor: string | null;

  // @Field({ nullable: true })
  // previousCursor: string | null;

  @Field({ nullable: false })
  hasNextPage: boolean;

  @Field({ nullable: false })
  hasPreviousPage: boolean;
}
