import { Post } from "../../../models/Post";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePostReq implements Partial<Post> {
  @Field({ nullable: false })
  title: string;
}
