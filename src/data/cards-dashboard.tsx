import {
  Briefcase,
  Clock,
  Bookmark,
  Users,
  ClipboardList,
  GraduationCap
} from 'lucide-react';
import type { VarianteCard } from '@/components/CardInformativo';
import type { LucideIcon } from 'lucide-react';

export interface DadosCardDashboard {
  titulo: string;
  valor: React.ReactNode;
  subtitulo?: string;
  icone: LucideIcon;
  variante: VarianteCard;
}

export const cardsAluno: DadosCardDashboard[] = [
  {
    titulo: 'Meus Estágios',
    valor: '1',
    subtitulo: 'Status: Em andamento',
    icone: Briefcase,
    variante: 'azul',
  },
  {
    titulo: 'Horas Cumpridas',
    valor: <>150<span className="text-2xl font-semibold">h</span></>,
    subtitulo: 'Meta: 300h totais',
    icone: Clock,
    variante: 'verde',
  },
  {
    titulo: 'Vagas Salvas',
    valor: '3',
    subtitulo: 'Disponíveis no mural',
    icone: Bookmark,
    variante: 'laranja',
  },
];

export const cardsOrientador: DadosCardDashboard[] = [
  {
    titulo: 'Total de Alunos',
    valor: '12',
    subtitulo: '↗ +2 este mês',
    icone: Users,
    variante: 'azul',
  },
  {
    titulo: 'Estágios Ativos',
    valor: '08',
    subtitulo: '66% de taxa de ocupação',
    icone: Briefcase,
    variante: 'verde',
  },
  {
    titulo: 'Pendências',
    valor: '02',
    subtitulo: '⚠ Requer atenção',
    icone: ClipboardList,
    variante: 'laranja',
  },
];

export const cardsCoordenador: DadosCardDashboard[] = [
  {
    titulo: 'Total de Estágios',
    valor: '3',
    subtitulo: 'No semestre atual',
    icone: Briefcase,
    variante: 'azul',
  },
  {
    titulo: 'Em Andamento',
    valor: '1',
    subtitulo: 'Acompanhamento regular',
    icone: Users,
    variante: 'verde',
  },
  {
    titulo: 'Pendências',
    valor: '1',
    subtitulo: '⚠ Necessitam revisão',
    icone: ClipboardList,
    variante: 'laranja',
  },
  {
    titulo: 'Orientações',
    valor: '1',
    subtitulo: 'Ativas no momento',
    icone: GraduationCap,
    variante: 'roxo',
  },
];