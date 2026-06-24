import { supabase } from "./supabaseClient";
import {AgendaDefesa} from "./interfaces";

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