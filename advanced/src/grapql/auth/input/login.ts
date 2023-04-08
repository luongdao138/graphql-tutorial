import { Field, InputType } from "type-graphql";

@InputType()
export class LoginReq {
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;
}
