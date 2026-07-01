import { supabase } from "./supabaseClient";

export async function atualizarDadosUsuario(nome: string, email: string, senha?: string) {
  try {
    // Montamos o objeto de atualização. O 'full_name' vai para os metadados
    const updates: any = {
      email: email,
      data: { full_name: nome }
    };

    // Só adicionamos a senha se o usuário realmente digitou uma nova
    if (senha && senha.trim() !== '') {
      updates.password = senha;
    }

    // O Supabase atualiza os dados do usuário logado atualmente
    const { data, error } = await supabase.auth.updateUser(updates);

    if (error) {
      console.error("Erro ao atualizar perfil no Supabase:", error.message);
      return { sucesso: false, erro: error.message };
    }

    return { sucesso: true, data };
  } catch (err) {
    console.error("Erro inesperado:", err);
    return { sucesso: false, erro: "Erro interno ao tentar atualizar." };
  }
}