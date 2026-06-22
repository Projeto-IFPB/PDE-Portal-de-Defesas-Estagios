import { supabase } from "./supabaseClient";
import { Usuario, Estagio, EstagioRecomendado } from "./interfaces";


// Funcoes de Puxar Dados(Select/Get)

// 1. Listar todos os usuários 
export async function listarTodosUsuarios(): Promise<Usuario[] | null> {
  try {
    const { data, error } = await supabase
      .from('Usuarios')
      .select('id, Email, "Nome-Completo", "tipo-de-perfil"'); 

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
      .from('Usuarios')
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
      .from('Estagios')
      .select('*')
      .eq('Id_estagiario', estagiarioId); 

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
      .from('Estagios')
      .select('*')
      .eq('Id_orientador', orientadorId);  

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
      .from('Estagios')
      .select('*')
      .eq('Id_coordenador', coordenadorId);

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
//O caminho completo guardado no banco (ex: 'termo_compromisso_Assert_Lemuel_Duarte.pdf ou se tiver no root que acho que é o nosso caso so o nome do arquivo') 

export async function obterUrlDocumentoBucket(caminhoArquivo: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from('Documentos') 
      .createSignedUrl(caminhoArquivo, 180);

    if (error) {
      console.error("Erro detalhado do Bucket:", error);
      return null;
    }

    return data.signedUrl; 
  } catch (error) {
    console.error("Erro inesperado em obterUrlDocumentoBucket:", error);
    return null;
  }
}
//7. puxar documento do estagio pelo tipo dele
export async function obterDocumentoDoEstagio(
  estagioId: string, 
  tipoDocumento: string
): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('Documentos')
      .select('caminho_arquivo')
      .eq('id_estagio', estagioId)
      .eq('tipo_documento', tipoDocumento)
      .single();

    if (error || !data) {
      console.error(`Erro ao buscar meta-dados:`, error);
      return null;
    }
    return await obterUrlDocumentoBucket(data.caminho_arquivo);
    
  } catch (error) {
    console.error("Erro inesperado em obterDocumentoDoEstagio:", error);
    return null;
  }
}
//8. buscar imagem
export async function obterUrlPublicaFotoPerfil(caminhoArquivo: string | null | undefined): Promise<string> {
   if (!caminhoArquivo) {
    return "sem imagem";
  }
  const { data } = supabase.storage
    .from('Fotos_perfil') 
    .getPublicUrl(caminhoArquivo);

  return data.publicUrl;
}
//9. Obter caminho da imagem de perfil
export async function obterCaminhoFotoPerfil(idUsuario: string): Promise<string | null> {
  
  try {
    const { data, error } = await supabase
      .from('Fotos_perfil')
      .select('caminho_arquivo')
      .eq('id_usuario', idUsuario)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data.caminho_arquivo;
  } catch (error) {
    console.error("Erro inesperado ao buscar caminho da foto:", error);
    return null;
  }
}
//10. Listar Estagios Recomendados 
export async function listarEstagiosRecomendados(): Promise<EstagioRecomendado[] | null> {
  try {
    const { data, error } = await supabase
      .from('Estagios_Recomendados')
      .select('*'); 

    if (error) {
      console.error("Erro ao listar todos os Estágios Disponíveis:", error.message);
      return null;
    }

    console.log(data)

    return data as EstagioRecomendado[];
  } catch (error) {
    console.error("Erro inesperado em listarEstagiosRecomendados:", error);
    return null;
  }
}

// Função de Upload de foto de perfil para o Storage do supabase
export async function uploadFotoPerfil(
  arquivo: File,
  idUsuario: string
): Promise<string | null> {
  try {
    const caminhoAntigo = await obterCaminhoFotoPerfil(idUsuario);

    if (caminhoAntigo) {
      await supabase.storage
        .from('Fotos_perfil')
        .remove([caminhoAntigo]);
    }

    const caminho = `${idUsuario}/perfil_${Date.now()}`;

    const { error } = await supabase.storage
      .from('Fotos_perfil')
      .upload(caminho, arquivo);

    if (error) {
      console.error("Erro ao fazer upload da foto:", error.message);
      return null;
    }

    return caminho;
  } catch (error) {
    console.error("Erro inesperado em uploadFotoPerfil:", error);
    return null;
  }
}


// Salvar/atualizar o caminho da foto na tabela Fotos_perfil
export async function salvarCaminhoFotoPerfil(
  idUsuario: string,
  caminhoArquivo: string,
  nomeArquivo: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('Fotos_perfil')
      .upsert(
        {
          id_usuario: idUsuario,
          caminho_arquivo: caminhoArquivo,
          nome: nomeArquivo,
        },
        { onConflict: 'id_usuario'}
      );

    if (error) {
      console.error("Erro ao salvar caminho da foto:", error.message);
      return false;
    }
    return true;

  } catch (error) {
    console.error("Erro inesperado em salvarCaminhoFotoPerfil", error);
    return false;
  }
}

// Funcoes de inserir dados (Insert/Post)

//* Cadastra um novo usuário no Supabase Auth enviando o perfil junto.

// Funcoes de inserir dados (Insert/Post)

//* Cadastra um novo usuário no Supabase Auth enviando o perfil junto.
