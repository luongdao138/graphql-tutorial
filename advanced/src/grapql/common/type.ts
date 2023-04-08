import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class ReponsePaginationCursor {
  @Field(() => String, { nullable: true })
  nextToken: string | null;

  @Field(() => Boolean, { defaultValue: true })
  hasMore: boolean;

  @Field(() => Int, { defaultValue: 25 })
  limit: number;
}
