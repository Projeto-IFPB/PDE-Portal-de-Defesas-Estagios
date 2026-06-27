"use client";

import { useEffect, useState } from "react";
import { Briefcase, Users, ClipboardList, LucideIcon } from "lucide-react";
import CabecalhoBoasVindas from "@/components/CabecalhoBoasVindas";
import CardInformativo, { VarianteCard } from "@/components/CardInformativo";
import OrientacaoCard from "@/components/CardOrientacoes";
import { listarEstagiosPorOrientadorId } from "@/lib/supabase/functions-select";
import { useOrientacoes } from "@/hooks/useOrientacoes";

interface DadosCardDashboard {
  titulo: string;
  valor: React.ReactNode;
  subtitulo?: string;
  icone: LucideIcon;
  variante: VarianteCard;
}

export default function DashboardOrientador({ usuarioId }: { usuarioId: string }) {
  const [metricas, setMetricas] = useState<DadosCardDashboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { orientacoes } = useOrientacoes();

  useEffect(() => {
    async function carregarDados() {
      setIsLoading(true);
      try {
        const orientacoesDB = await listarEstagiosPorOrientadorId(usuarioId) || [];
        const ativosOri = orientacoesDB.filter(e => e.status?.toLowerCase() === 'em_andamento').length;
        const pendentesOri = orientacoesDB.filter(e => e.status?.toLowerCase() === 'pendente').length;
        const unicosOri = new Set(orientacoesDB.map(e => e.Id_estagiario)).size;

        setMetricas([
          {
            titulo: 'Estágios em Andamento',
            valor: ativosOri.toString(),
            subtitulo: 'Sendo supervisionados no momento',
            icone: Briefcase,
            variante: 'azul',
          },
          {
            titulo: 'Estágios Pendentes',
            valor: pendentesOri.toString(),
            subtitulo: pendentesOri > 0 ? 'Requer sua atenção' : 'Tudo em dia',
            icone: ClipboardList,
            variante: 'laranja',
          },
          {
            titulo: 'Total de Alunos',
            valor: unicosOri.toString(),
            subtitulo: unicosOri === 1 ? 'Estudante vinculado' : 'Estudantes vinculados',
            icone: Users,
            variante: 'verde',
          },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (usuarioId) carregarDados();
  }, [usuarioId]);

  return (
    <>
      <CabecalhoBoasVindas 
        titulo="Bem-vindo, Professor"
        subtitulo="Gerencie seus orientandos e acompanhe o progresso acadêmico."
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {isLoading ? (
          <div className="col-span-full h-35 flex items-center text-gray-500 animate-pulse dark:text-slate-400">
            Carregando métricas do orientador...
          </div>
        ) : (
          metricas.map((card, index) => (
            <CardInformativo
              key={index}
              titulo={card.titulo}
              valor={card.valor}
              subtitulo={card.subtitulo}
              icone={card.icone}
              variante={card.variante}
            />
          ))
        )}
      </section>

      <section className="mt-10 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-slate-400">Minhas Orientações</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orientacoes.map((orientacao) => (
            <OrientacaoCard
              key={orientacao.id}
              id={orientacao.id}
              nomeEstagiario={orientacao.nome_estagiario || "Sem nome"}
              emailEstagiario={orientacao.email_estagiario || "Sem email"}
              empresa={orientacao.empresa}
              data={orientacao.data_de_inicio}
              status={orientacao.status}
              foto_perfil={orientacao.foto_estagiario}
            />
          ))}
        </div>
      </section>
    </>
  );
}