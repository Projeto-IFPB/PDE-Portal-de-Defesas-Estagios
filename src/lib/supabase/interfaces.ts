
// --- INTERFACES PARA TIPAGEM
export interface Usuario {
  id: string; 
  Email: string; 
  'Nome-Completo': string; 
  'tipo-de-perfil': 'aluno' | 'orientador' | 'coordenador' | 'pendente'; 
}

export interface Estagio {
  id: string;
  id_estagiario: string; 
  orientador_id: string; 
  id_coordenador: string | null;
  status: 'pendente' | 'em_andamento' | 'concluido';
  empresa: string;
  data_de_inicio: string; 
  nome_estagiario?: string;
  email_estagiario?: string;
}

export interface AgendaDefesa {
  id?: string;
  estagio_id: string; 
  data_defesa: string; 
  banca_examinadora: string[];
  status: 'agendado' | 'realizado' | 'cancelado';
  created_at?: string;
}

export interface EstagioRecomendado {
  id: string;
  created_at?: string;
  titulo: string;
  descricao?: string;
  empresa: string;
  competencia?: string;
  vagas?: number | null;
}