
// --- INTERFACES PARA TIPAGEM
export interface Usuario {
  id: string; 
  Email: string; 
  'Nome-Completo': string; 
  'tipo-de-perfil': 'aluno' | 'orientador' | 'coordenador' | 'pendente'; 
}

export interface Estagio {
  id: string | number; 
  aluno_id: string; 
  orientador_id: string; 
  id_coordenador: string | null;
  status: 'Pendente' | 'Em andamento' | 'Concluído';
  data_inicio: string; 
}

export interface UsuarioEspelho {
  id: string; 
  nome: string;
  email: string;
  perfil: 'estagiario' | 'orientador' | 'coordenador' | 'pendente';
  created_at: string;
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