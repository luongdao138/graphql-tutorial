import { Order } from "../../common/enum";
import { ArgsType, Field, Int } from "type-graphql";
import { PaginationInput } from "../../../grapql/common/args";

@ArgsType()
export class UserPostParams extends PaginationInput {
  @Field(() => Order, { defaultValue: Order.DESC })
  order: Order;
}
