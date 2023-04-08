import { Post } from "../../../models/Post";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdatePostReq implements Partial<Post> {
  @Field({ nullable: true })
  title?: string;
}
