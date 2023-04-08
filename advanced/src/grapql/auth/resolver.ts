import { MyContext } from "src";
import { AuthUtil } from "../../utils/auth";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { RegisterReq } from "./input/register";
import { User } from "../../models/User";
import { LoginReq } from "./input/login";
import { ApolloErrorCode, CustomGraphQLError } from "../../utils/errors";
import { validator } from "../../utils/validators/zod";
import { loginSchema, registerSchema } from "../../utils/validators/auth";
import { validatorReq } from "../../middlewares/auth";

/*
    gql`
       type LoginResponse {
         token: String!
         user: User!
       }
    `
*/

@ObjectType()
class LoginResponse {
  @Field({ nullable: false })
  token: string;

  @Field(() => User, { nullable: false })
  user: User;
}

@Resolver()
export class AuthResolver {
  private authUtil: AuthUtil;

  constructor() {
    this.authUtil = new AuthUtil();
  }

  @Query(() => User, { nullable: false })
  async me(@Ctx() { em, req }: MyContext): Promise<User> {
    const userId = validatorReq(req);

    const user = await em.findOneOrFail(User, { id: userId });
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async register(@Arg("data") data: RegisterReq, @Ctx() { em }: MyContext) {
    // validate input
    const validated = validator(data, registerSchema);

    // check if that user already exists or not
    const existing = await em.findOne(User, { username: validated.username });
    if (existing) {
      throw new CustomGraphQLError({
        code: ApolloErrorCode.DUPLICATE_ERROR,
        message: "User already exists!",
      });
    }

    const hashedPwd = await this.authUtil.hashPwd(validated.password);
    const user = em.create(User, {
      username: validated.username,
      password_hash: hashedPwd,
    });
    await em.persistAndFlush(user);
    return user;
  }

  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg("data") data: LoginReq,
    @Ctx() { em, res }: MyContext
  ): Promise<LoginResponse> {
    // validate input
    const validated = validator(data, loginSchema);

    // check if user already exists
    const existing = await em.findOne(User, { username: validated.username });
    if (!existing) {
      throw new CustomGraphQLError({
        code: ApolloErrorCode.BAD_REQUEST,
        message: "Credentials not valid!",
      });
    }

    const isValid = await this.authUtil.verifyPwd(
      existing.password_hash,
      validated.password
    );

    if (!isValid) {
      throw new CustomGraphQLError({
        code: ApolloErrorCode.BAD_REQUEST,
        message: "Credentials not valid!",
      });
    }

    // genereate access token if login success
    const token = await this.authUtil.generateAccessToken(existing.id);

    return {
      token,
      user: existing,
    };
  }

  @Mutation(() => Boolean, { nullable: true })
  async logout(@Ctx() { req }: MyContext): Promise<void> {
    const userId = req.user_id;
    if (!userId) return;

    await this.authUtil.deleteToken(userId, req.token);
  }
}
