import { z } from "zod";

const registerSchema = z.object({
  username: z.string().nonempty().min(2).max(30),
  password: z.string().nonempty().min(6).max(30),
});

const loginSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

export { loginSchema, registerSchema };
