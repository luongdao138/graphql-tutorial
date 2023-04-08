import {
  Cascade,
  Check,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { CustomBaseEntity } from "./Base";
import { User } from "./User";
import { generateEntityId } from "../utils/generate-id";
import { PostEvaluation } from "./PostEvaluation";

@ObjectType()
@Entity()
export class Post extends CustomBaseEntity<Post, "id"> {
  @Field(() => String, { nullable: false })
  @PrimaryKey({ type: "varchar" })
  id: string = generateEntityId("", "post");

  @Field({ nullable: false })
  @Property({ type: "text" })
  title!: string;

  @Field({ nullable: false, defaultValue: 0 })
  @Property({ type: "int", default: 0 })
  @Check({ expression: "like_cnt >= 0" })
  like_cnt?: number;

  @Field({ nullable: false, defaultValue: 0 })
  @Property({ type: "int", default: 0 })
  @Check({ expression: "comment_cnt >= 0" })
  comment_cnt?: number;

  @Field({ nullable: false, defaultValue: 0 })
  @Property({ type: "int", default: 0 })
  @Check({ expression: "upvote_cnt >= 0" })
  upvote_cnt?: number;

  @Field({ nullable: false, defaultValue: 0 })
  @Property({ type: "int", default: 0 })
  @Check({ expression: "downvote_cnt >= 0" })
  downvote_cnt?: number;

  @Field(() => [PostEvaluation!]!, { nullable: true })
  @OneToMany(() => PostEvaluation, (pe) => pe.post)
  evaluations?: PostEvaluation;

  @Field(() => User!, { nullable: false })
  @ManyToOne({ entity: () => User, cascade: [Cascade.REMOVE, Cascade.PERSIST] })
  user?: User;
}
