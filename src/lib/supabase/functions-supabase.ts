import { supabase } from "./supabaseClient";
import { Usuario, Estagio } from "./interface";


// Funcoes de Puxar Dados(Select/Get)

// 1. Listar todos os usuários 
export async function listarTodosUsuarios(): Promise<Usuario[] | null> {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, email, nome, perfil'); 

    if (error) {
      console.error("Erro ao listar todos os usuários:", error.message);
      return null;
    }

    return data as Usuario[];
  } catch (error) {
    console.error("Erro inesperado em listarTodosUsuarios:", error);
    return null;
  }
}

// 2. Buscar usuário pelo ID
export async function buscarUsuarioPorId(id: string): Promise<Usuario | null> {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', id) 
      .single();   

    if (error) {
      console.error(`Erro ao buscar usuário com ID ${id}:`, error.message);
      return null;
    }

    return data as Usuario;
  } catch (error) {
    console.error("Erro inesperado em buscarUsuarioPorId:", error);
    return null;
  }
}



// 3. Listar estágios de um Estagiario específico

export async function listarEstagiosPorEstagiarioId(estagiarioId: string): Promise<Estagio[] | null> {
  try {
    const { data, error } = await supabase
      .from('estagios')
      .select('*')
      .eq('aluno_id', estagiarioId); 

    if (error) {
      console.error(`Erro ao listar estágios do aluno ${estagiarioId}:`, error.message);
      return null;
    }

    return data as Estagio[];
  } catch (error) {
    console.error("Erro inesperado em listarEstagiosPorEstagiarioId:", error);
    return null;
  }
}

// 4. Listar estágios sob a supervisão de um Orientador específico
export async function listarEstagiosPorOrientadorId(orientadorId: string): Promise<Estagio[] | null> {
  try {
    const { data, error } = await supabase
      .from('estagios')
      .select('*')
      .eq('orientador_id', orientadorId);  

    if (error) {
      console.error(`Erro ao listar estágios do orientador ${orientadorId}:`, error.message);
      return null;
    }

    return data as Estagio[];
  } catch (error) {
    console.error("Erro inesperado em listarEstagiosPorOrientadorId:", error);
    return null;
  }
}
// 5. Listar estágios vinculados a um Coordenador específico
export async function listarEstagiosPorCoordenadorId(coordenadorId: string): Promise<Estagio[] | null> {
  try {
    const { data, error } = await supabase
      .from('estagios')
      .select('*')
      .eq('id_coordenador', coordenadorId);

    if (error) {
      console.error(`Erro ao listar estágios do coordenador ${coordenadorId}:`, error.message);
      return null;
    }

    return data as Estagio[];
  } catch (error) {
    console.error("Erro inesperado em listarEstagiosPorCoordenadorId:", error);
    return null;
  }
}

//6. Puxar documentos do Bucket (Gerar URL de visualização/download)
//O caminho completo guardado no banco (ex: 'documentos/termo_compromisso_Assert_Lemuel_Duarte.pdf') 

export async function obterUrlDocumentoBucket(caminhoArquivo: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from('documentos') 
      .createSignedUrl(caminhoArquivo, 120);

    if (error) {
      console.error("Erro ao gerar link assinado do bucket:", error.message);
      return null;
    }

    return data.signedUrl; 
  } catch (error) {
    console.error("Erro inesperado em obterUrlDocumentoBucket:", error);
    return null;
  }
}
// Funcoes de inserir dados (Insert/Post)

//* Cadastra um novo usuário no Supabase Auth enviando o perfil junto.

