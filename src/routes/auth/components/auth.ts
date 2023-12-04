import { z } from "zod";

// Define your form schema using zod
export const signupformSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),

  email: z.string({
    required_error: "Email is required.",
  }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),

  passwordConfirm: z
    .string({
      required_error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});

export type TSignupformSchema = z.infer<typeof signupformSchema>;
export const signinformSchema = z.object({
  usernameOrEmail: z.string({
    required_error: "Email or Username is required.",
  }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});
export type TSigninformSchema = z.infer<typeof signinformSchema>;
