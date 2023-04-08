import { Cascade, Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { EvaluatePostType } from "../grapql/post/input/evaluatePost";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity({ tableName: "post_evaluation" })
export class PostEvaluation {
  @Field(() => String, { nullable: false })
  @Property({ primary: true, type: "varchar" })
  user_id: string;

  @Field(() => String, { nullable: false })
  @Property({ primary: true, type: "varchar" })
  post_id: string;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, { cascade: [Cascade.REMOVE, Cascade.PERSIST] })
  user: User;

  @Field(() => Post, { nullable: false })
  @ManyToOne(() => Post, { cascade: [Cascade.REMOVE, Cascade.PERSIST] })
  post: Post;

  @Field(() => EvaluatePostType, { nullable: false })
  @Enum({ items: () => EvaluatePostType, nullable: false })
  value: EvaluatePostType;

  @Field(() => Int, { nullable: true })
  @Property({ type: "datetime" })
  created_at? = new Date();
}
