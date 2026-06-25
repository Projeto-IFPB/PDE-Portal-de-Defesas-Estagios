import { supabase } from "./supabaseClient";
import {AgendaDefesa, CadastroEstagio} from "./interfaces";

// 1. Agendar Defesa de Determinado Estagio
export async function agendarDefesa(novaDefesa: AgendaDefesa) {
  try {
    const { data, error } = await supabase
      .from('Defesa_estagios')
      .insert([
        {
          id_estagio: novaDefesa.id_estagio,
          data_defesa: novaDefesa.data_defesa,
          local_defesa: novaDefesa.local_defesa,
          banca_examinadora: novaDefesa.banca_examinadora,
          titulo: novaDefesa.titulo,
          horario_defesa: novaDefesa.horario_defesa,
          status: 'agendado',
        },
      ])
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Erro ao agendar defesa:', error);
    throw error;
  }
}
//2. Inserir Documento no bucket e tambem na tabela Documentos
export async function uploadESalvarDocumento(
  file: File,
  id_estagio: string,
  tipo_documento: 'ata_defesa' | 'relatorio_final' | 'termo_de_compromisso' | 'termo_de_orientacao'
) {
  try {
    const extensao = file.name.split('.').pop();
    const nome = `${Date.now()}_${tipo_documento}.${extensao}`;
    const caminho = `${id_estagio}/${nome}`; 

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('Documentos') 
      .upload(caminho, file);

    if (uploadError) throw uploadError;

    const caminhoArquivo = uploadData.path;

    const { data: dbData, error: dbError } = await supabase
      .from('Documentos') 
      .insert([
        {
          nome: file.name,
          id_estagio: id_estagio,
          caminho_arquivo: caminhoArquivo,
          tipo_documento: tipo_documento,
        }
      ])
      .select();

    if (dbError) throw dbError;

    return dbData;
  } catch (error) {
    console.error(`Erro ao fazer upload do documento ${tipo_documento}:`, error);
    throw error;
  }
}
export async function cadastrarEstagio({
  idEstagiario,
  nomeOrientador,
  nomeCoordenador,
  empresa,
  curso,
  cargaHoraria,
  dataFim,
  descricao,
  usuariosSugestoes,
  termoCompromisso,
  termoOrientacao
}: CadastroEstagio) {
  console.log("====== DEBUG DE CADASTRO ======");
  console.log("Digitado Orientador:", `"${nomeOrientador}"`);
  console.log("Digitado Coordenador:", `"${nomeCoordenador}"`);
  console.log("Lista de Sugestões na Memória:", usuariosSugestoes);
  console.log("===============================");


  const orientador = usuariosSugestoes.find(
    (u) => u.Nome_Completo === nomeOrientador && (u.tipo_de_perfil?.toLowerCase() === "orientador" || u.tipo_de_perfil?.toLowerCase() === "coordenador")
  );
  const coordenador = usuariosSugestoes.find(
    (u) => u.Nome_Completo === nomeCoordenador && u.tipo_de_perfil?.toLowerCase() === "coordenador"
  );

  if (!orientador || !coordenador) {
    // Melhoramos o erro para te dizer no alert quem ele não encontrou
    const quemFaltou = !orientador && !coordenador 
      ? "Orientador e Coordenador" 
      : !orientador ? "Orientador" : "Coordenador";
      throw new Error(`Por favor, selecione um ${quemFaltou} válido da lista.`);
  }
  const { data: novoEstagio, error: erroEstagio } = await supabase
    .from("Estagios")
    .insert([
      {
        Id_estagiario: idEstagiario,
        Id_orientador: orientador.id,
        Id_coordenador: coordenador.id,
        empresa,
        curso,
        descricao,
        carga_horaria: Number(cargaHoraria),
        previsao_data_fim: dataFim,
      },
    ])
    .select("id")
    .single();

  if (erroEstagio) throw erroEstagio;
  if (!novoEstagio?.id) throw new Error("Não foi possível obter o ID do estágio criado.");

  if (termoCompromisso){
      await uploadESalvarDocumento(
        termoCompromisso,
        novoEstagio.id,
        "termo_de_compromisso"
      );}
  if (termoOrientacao){
      await uploadESalvarDocumento(
        termoOrientacao,
        novoEstagio.id,
        "termo_de_orientacao"
      ); }
  return novoEstagio;
}