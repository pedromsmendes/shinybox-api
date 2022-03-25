import {
  Field, ObjectType, registerEnumType,
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

@ObjectType()
export class File {
  @Field({ nullable: false })
  filename: string;

  @Field({ nullable: false })
  mimetype: string;

  @Field({ nullable: false })
  encoding: string;
}
