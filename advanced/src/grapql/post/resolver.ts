import { FilterQuery, wrap } from "@mikro-orm/core";
import { MyContext, Pagination, ResultWithCursorPagination } from "src";
import { decryptCursor, encryptCursor } from "../../utils/pagination-cursor";
import {
  Arg,
  Args,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
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
import { ReponsePaginationCursor } from "../common/type";
import { UserPostParams } from "../user/args/getUserPosts";
import { CreatePostReq } from "./input/createPost";
import { UpdatePostReq } from "./input/updatePost";
import { EvaluatePostReq } from "./input/evaluatePost";

@ObjectType()
class UserPostResponse {
  @Field(() => [Post!]!)
  data: Post[];

  @Field(() => ReponsePaginationCursor, { nullable: false })
  pagination: Pagination;
}

@Resolver((of) => Post)
export class PostResolver {
  @Query(() => Post, { nullable: true })
  getPost(
    @Arg("id", () => String) id: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOneOrFail(Post, { id });
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(AuthGuard)
  async createPost(
    @Arg("data", { nullable: false }) newPostReq: CreatePostReq,
    @Ctx() { em, req }: MyContext
  ): Promise<Post | null> {
    const userId = req.user_id;

    const post = em.create(Post, { ...newPostReq, user: userId });

    em.persist(post);
    await em.flush();

    return post;
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(AuthGuard)
  async updatePost(
    @Arg("id", () => String, { nullable: false }) id: string,
    @Arg("data", () => UpdatePostReq, { nullable: false }) data: UpdatePostReq,
    @Ctx() { em, req }: MyContext
  ): Promise<Post | null> {
    const userId = req.user_id;

    const post = await em.findOneOrFail(Post, { id: id, user: userId });

    if (data.title) {
      post.title = data.title;
      await em.flush();
    }

    return post;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(AuthGuard)
  async deletePost(
    @Arg("id", () => String, { nullable: false }) id: string,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    const post = em.getReference(Post, id);
    if (!post?.id) return false;

    // remove by reference
    await em.remove(post).flush();

    return true;
  }

  @FieldResolver(() => User)
  async user(
    @Root() post: Post,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    const userId = post.user?.id;

    return await em.findOne(User, { id: userId });
  }

  @Query(() => UserPostResponse, { nullable: false })
  @UseMiddleware(AuthGuard)
  async getUserPosts(
    @Arg("userId", { nullable: false }) userId: string,
    @Args()
    params: UserPostParams,
    @Ctx() { em }: MyContext
  ): Promise<ResultWithCursorPagination<Post>> {
    const validated = validator(
      params,
      PaginationValidator.merge(OrderValidator)
    );

    const { cursor, take } = validated;

    const whereOpts: FilterQuery<Post> = { user: userId };
    if (cursor) {
      const decryptedCursor = decryptCursor(cursor);
      whereOpts.id = { $lte: decryptedCursor };
    }

    const posts = await em.find(Post, whereOpts, {
      limit: take + 1,
      orderBy: { id: "DESC" },
    });
    const hasMore = posts.length === take + 1;
    let nextToken: string | null = null;

    if (hasMore) {
      const nextCursorRecord = posts[take];
      nextToken = encryptCursor(nextCursorRecord.id);

      posts.pop();
    }

    return {
      data: posts,
      pagination: {
        hasMore,
        limit: take,
        nextToken,
      },
    };
  }

  @Mutation(() => Boolean, { nullable: false })
  @UseMiddleware(AuthGuard)
  async evaluatePost(
    @Ctx() { em }: MyContext,
    @Arg("data") data: EvaluatePostReq
  ) {
    return true;
  }
}
