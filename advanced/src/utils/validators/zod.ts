import { z } from "zod";
import { CustomGraphQLError, ApolloErrorCode } from "../errors";

export const PaginationValidator = z.object({
  cursor: z.string().nullable().optional(),
  take: z.number().min(1).max(50).default(25),
});

export const OrderValidator = z.object({
  order: z.enum(["DESC", "ASC"]).default("DESC"),
});

export function validator<S extends z.AnyZodObject>(
  input: unknown,
  schema: S
): z.infer<S> {
  const validationResult = schema.safeParse(input);

  if (validationResult.success) return validationResult.data;

  // just throw error if input not valid
  throw new CustomGraphQLError({
    code: ApolloErrorCode.BAD_USER_INPUT,
    message: "Input validation failed",
    detail: validationResult.error.flatten(),
  });
}
