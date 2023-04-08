import { BaseEntity, Property } from "@mikro-orm/core";
import { Field, Float, Int, ObjectType } from "type-graphql";

@ObjectType()
export class CustomBaseEntity<
  E extends object,
  P extends keyof E
> extends BaseEntity<E, P> {
  @Field(() => Float, { nullable: true })
  @Property({ type: "datetime" })
  created_at? = new Date();

  @Field(() => Float, { nullable: true })
  @Property({ type: "datetime", onUpdate: () => new Date() })
  updated_at? = new Date();
}
