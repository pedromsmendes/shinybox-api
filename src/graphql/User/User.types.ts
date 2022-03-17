import {
  Field, InputType, ObjectType,
} from 'type-graphql';

import { Role } from '../Role/Role.types';

@ObjectType()
export class User {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: true })
  name: string | null;

  @Field({ nullable: true })
  avatar: string | null;

  @Field({ nullable: false })
  roleId: string;

  @Field(() => Role, { nullable: false })
  role: Role;

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
