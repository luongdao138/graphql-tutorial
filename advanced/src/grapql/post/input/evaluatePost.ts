import { Field, InputType, registerEnumType } from "type-graphql";

export enum EvaluatePostType {
  UPVOTE = "UPVOTE",
  DOWNVOTE = "DOWNVOTE",
}

registerEnumType(EvaluatePostType, { name: "EvaluatePostType" });

@InputType()
export class EvaluatePostReq {
  @Field(() => EvaluatePostType, {
    nullable: true,
    defaultValue: EvaluatePostType.UPVOTE,
  })
  type: EvaluatePostType;

  @Field(() => String, { nullable: false })
  post_id: string;
}
