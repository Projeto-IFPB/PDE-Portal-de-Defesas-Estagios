import { supabase } from './supabaseClient'; 

export async function atualizarDadosUsuario(idUsuario: string, nome: string, email: string, senha?: string) {
  try {
    const emailLimpo = email.trim();
    const nomeLimpo = nome.trim();

    // Buscamos o usuário atual logado para poder comparar as informações
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return { sucesso: false, erro: "Usuário não autenticado." };
    }

    // Preparamos o objeto de atualização
    const authUpdates: any = {
      data: { full_name: nomeLimpo }
    };

    if (emailLimpo !== user.email) {
      authUpdates.email = emailLimpo;
    }

    // Só adiciona a senha se ela foi preenchida
    if (senha && senha.trim() !== '') {
      authUpdates.password = senha.trim();
    }

    // Atualiza no Auth
    const { error: authError } = await supabase.auth.updateUser(authUpdates);

    if (authError) {
      console.error("Erro ao atualizar Auth:", authError.message);
      return { sucesso: false, erro: authError.message };
    }

    // Força a atualização na sua tabela 'Usuarios'
    const { error: dbError } = await supabase
      .from('Usuarios')
      .update({ 
        Nome_Completo: nomeLimpo,
        Email: emailLimpo 
      })
      .eq('id', idUsuario);

    if (dbError) {
      console.error("Erro ao atualizar tabela Usuarios:", dbError.message);
      return { sucesso: false, erro: dbError.message };
    }

    return { sucesso: true };
  } catch (err: any) {
    console.error("Erro inesperado:", err);
    return { sucesso: false, erro: err.message || "Erro interno ao tentar atualizar." };
  }
}
