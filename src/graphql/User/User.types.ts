import {
  Field, InputType, ObjectType,
} from 'type-graphql';

import { Role } from '../Role/Role.types';

@ObjectType()
export class User {
  @Field(() => String, { nullable: false })
  id: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => String, { nullable: true })
  avatar: string | null;

  @Field(() => String, { nullable: false })
  roleId: string;

  @Field(() => Role, { nullable: false })
  role: Role;

  @Field({ nullable: false })
  createdAt: Date;

  @Field({ nullable: false })
  updatedAt: Date;
}

@InputType()
export class UserCreate {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: false })
  roleId: string;
}

@InputType()
export class UserUpdate {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  roleId?: string;
}
