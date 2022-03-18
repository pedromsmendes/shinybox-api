import { RoleCode } from '@prisma/client';
import {
  Field, InputType, ObjectType,
} from 'type-graphql';

@ObjectType()
export class Role {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  code: RoleCode;

  @Field(() => Boolean, { nullable: false })
  isAdmin: boolean;

  @Field({ nullable: false })
  createdAt: Date;

  @Field({ nullable: false })
  updatedAt: Date;
}

@InputType()
export class RoleCreate {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  code: string;

  @Field(() => Boolean, { nullable: true })
  isAdmin?: boolean;
}

@InputType()
export class RoleUpdate {
  @Field({ nullable: false })
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => Boolean, { nullable: true })
  isAdmin?: boolean;
}
