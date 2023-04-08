import { FilterQuery } from "@mikro-orm/core";
import { MyContext } from "src";
import { decryptCursor, encryptCursor } from "../../utils/pagination-cursor";
import {
  Args,
  Ctx,
  FieldResolver,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { AuthGuard } from "../../middlewares/auth";
import { Post } from "../../models/Post";
import { User } from "../../models/User";
import {
  OrderValidator,
  PaginationValidator,
  validator,
} from "../../utils/validators/zod";
import { UserPostParams } from "./args/getUserPosts";

@Resolver((of) => User)
export class UserResolver {
  @FieldResolver(() => [Post!]!)
  @UseMiddleware(AuthGuard)
  async posts(
    @Args() params: UserPostParams,
    @Root() user: User,
    @Ctx() { em }: MyContext
  ): Promise<Post[]> {
    const validated = validator(
      params,
      PaginationValidator.merge(OrderValidator)
    );

    const { cursor, take } = validated;

    const whereOpts: FilterQuery<Post> = { user: user.id };
    if (cursor) {
      const decryptedCursor = decryptCursor(cursor);
      whereOpts.id = { $lte: decryptedCursor };
    }

    const posts = await em.find(Post, whereOpts, {
      limit: take,
      orderBy: { id: "DESC" },
    });

    return posts;
  }
}
