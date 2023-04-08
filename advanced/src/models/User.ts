import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { CustomBaseEntity } from "./Base";
import { Post } from "./Post";
import { generateEntityId } from "../utils/generate-id";

@ObjectType()
@Entity()
export class User extends CustomBaseEntity<User, "id"> {
  @Field(() => String, { nullable: false })
  @PrimaryKey({ type: "varchar" })
  id: string = generateEntityId("", "usr");

  @Field({ nullable: false })
  @Property({ type: "varchar", unique: true, nullable: false })
  username!: string;

  @Property({ type: "varchar", nullable: false })
  password_hash!: string;

  @Field(() => [Post!]!, { nullable: false })
  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];
}
