import {
  Field, ObjectType, Query, registerEnumType, Resolver,
} from 'type-graphql';

export enum Code {
  BAD_USER_INPUT = 'badUserInput',
  WRONG_BINO = 'wrongBino',
}

registerEnumType(Code, {
  name: 'Code',
  description: 'The codes from the dang errors mang',
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

@Resolver()
class JustForTypes {
  @Query(() => GraphqlError, { nullable: true })
  justForTypes() {
    return null;
  }
}

export default JustForTypes;
