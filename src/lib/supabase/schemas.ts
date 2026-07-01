// lib/supabase/schemas.ts
import { z } from "zod";

// 1. SCHEMA PARA VALIDAÇÃO DO LOGIN
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O e-mail é obrigatório." })
    .email({ message: "Insira um e-mail válido." }),
  senha: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
});

// Extraímos o tipo inferido pelo Zod para usarmos no React Hook Form depois
export type LoginFormData = z.infer<typeof loginSchema>;


// 2. SCHEMA PARA VALIDAÇÃO DO CADASTRO
export const cadastroSchema = z
  .object({
    tipo_de_perfil: z.enum(["aluno", "orientador", "coordenador", "pendente"], {
        message: "Selecione um tipo de perfil válido.",
    }),
    Nome_Completo: z
      .string()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres." })
      .max(100, { message: "O nome está longo demais." }),
    Email: z
      .string()
      .min(1, { message: "O e-mail é obrigatório." })
      .email({ message: "Insira um e-mail válido." }),
    senha: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
    confirmarSenha: z
      .string()
      .min(1, { message: "A confirmação de senha é obrigatória." }),
  })
  // Aqui fazemos o Zod checar se as duas senhas são idênticas (requisito clássico de sistema seguro)
  .refine((dados) => dados.senha === dados.confirmarSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmarSenha"], // O erro vai aparecer focado no input de confirmar senha
  });

export type CadastroFormData = z.infer<typeof cadastroSchema>;