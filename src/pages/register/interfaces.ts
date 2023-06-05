import { z } from "zod";

export const userSchema = z.object({
  name: z.string().nonempty("Digite um nome").max(50),
  email: z
    .string()
    .nonempty("Email é obrigatorio")
    .email({ message: "Digite um email válido" })
    .max(120),
  password: z.string().min(8).max(120).nonempty("senha é obrigatorio"),
  img_user_src: z.string().optional(),
});

export type UserType = z.infer<typeof userSchema>;

export const userExtend = userSchema
  .extend({
    confirmPassword: z.string().nonempty("As senhas precisam ser iguais"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });
