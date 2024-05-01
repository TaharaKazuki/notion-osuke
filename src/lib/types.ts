import * as z from 'zod';

// Login
export const LoginFormSchema = z.object({
  email: z.string().describe('Email').email({ message: 'Invalid Email' }),
  password: z.string().describe('Password').min(1, 'Password is required'),
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

// SignUp
export const SignUpFormSchema = z
  .object({
    email: z.string().describe('Email').email({ message: 'Invalid Email' }),
    password: z
      .string()
      .describe('Password')
      .min(6, 'Password must be minimum 6 characters'),
    confirmPassword: z
      .string()
      .describe('Confirm Password')
      .min(6, 'Password must be minimum 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;

export const CreateWorkspaceFormSchema = z.object({
  workspaceName: z
    .string()
    .describe('Workspace Name')
    .min(1, 'Workspace name must be min of 1 character'),
  logo: z.any(),
});

export type CreateWorkspaceFormSchemaType = z.infer<
  typeof CreateWorkspaceFormSchema
>;

export const UploadBannerFormSchema = z.object({
  banner: z.string().describe('Banner Image'),
});
