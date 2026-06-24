
// --- INTERFACES PARA TIPAGEM
export interface Usuario {
  id: string; 
  Email: string; 
  Nome_Completo: string; 
  tipo_de_perfil: 'aluno' | 'orientador' | 'coordenador' | 'pendente'; 
}

export interface Estagio {
  id: string;
  Id_estagiario: string; 
  Id_orientador: string; 
  Id_coordenador: string | null;
  status: 'pendente' | 'em_andamento' | 'concluido';
  empresa: string;
  data_de_inicio: string; 
  nome_estagiario?: string;
  email_estagiario?: string;
  foto_estagiario?: string;
  curso?: string
  carga_horaria?: string
  previsao_data_fim?: string
}

export interface AgendaDefesa {
  id?: string;
  id_estagio: string; 
  data_defesa: string; 
  banca_examinadora: {};
  status: 'agendado' | 'realizado' | 'cancelado';
  created_at?: string;
  ata_defesa?: string;
  relatorio_final?: string;
  local_defesa: string;
  titulo?: string;
  horario_defesa?: string;
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

export interface MembroBanca {
    nome: string;
    email?: string;
}

export interface InterfaceCardBancaDefesa {
    data: string;
    status: "agendado" | "realizado" | "cancelado";
    titulo?: string;
    horario?: string;
    local: string;
    banca: MembroBanca[];
}