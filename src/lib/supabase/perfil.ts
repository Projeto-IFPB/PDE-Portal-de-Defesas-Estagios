import { supabase } from './supabaseClient'; // Ajuste o caminho se necessário

export async function atualizarDadosUsuario(idUsuario: string, nome: string, email: string, senha?: string) {
  try {
    // 1. Atualiza as credenciais no Auth (Autenticação do Supabase)
    const authUpdates: any = {
      email: email,
      data: { full_name: nome }
    };

    if (senha && senha.trim() !== '') {
      authUpdates.password = senha;
    }

    const { error: authError } = await supabase.auth.updateUser(authUpdates);

    if (authError) {
      console.error("Erro ao atualizar Auth:", authError.message);
      return { sucesso: false, erro: authError.message };
    }

    // 2. Força a atualização na sua tabela 'Usuarios'
    const { error: dbError } = await supabase
      .from('Usuarios')
      .update({ 
        Nome_Completo: nome,
        Email: email 
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
