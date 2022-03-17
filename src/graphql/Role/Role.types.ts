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
