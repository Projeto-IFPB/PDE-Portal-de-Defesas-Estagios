
// --- INTERFACES PARA TIPAGEM
export interface Usuario {
  id: string; 
  email: string; 
  nome: string; 
  perfil: 'aluno' | 'orientador' | 'coordenador' | 'pendente'; 
}

export interface Estagio {
  id: string | number; 
  aluno_id: string; 
  orientador_id: string; 
  id_coordenador: string | null;
  status: 'Pendente' | 'Em andamento' | 'Concluído';
  data_inicio: string; 
}

