"use client";

import { useEffect, useState } from "react";
import { Briefcase, Clock, Bookmark, LucideIcon } from "lucide-react";
import CabecalhoBoasVindas from "@/components/CabecalhoBoasVindas";
import CardInformativo, { VarianteCard } from "@/components/CardInformativo";
import { CardEstagioRecomendado, CardNenhumEstagioDisponivel } from "@/components/CardEstagioRecomendado";
import { listarEstagiosRecomendados, listarEstagiosPorEstagiarioId, listarDefesasAluno } from "@/lib/supabase/functions-select";
import { EstagioRecomendado } from "@/lib/supabase/interfaces";

interface DadosCardDashboard {
  titulo: string;
  valor: React.ReactNode;
  subtitulo?: string;
  icone: LucideIcon;
  variante: VarianteCard;
}

export default function DashboardAluno({ usuarioId }: { usuarioId: string }) {
  const [metricas, setMetricas] = useState<DadosCardDashboard[]>([]);
  const [estagiosDisponiveis, setEstagiosDisponiveis] = useState<EstagioRecomendado[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      setIsLoading(true);
      try {
        const [dadosRecomendados, meusEstagios, bancas] = await Promise.all([
          listarEstagiosRecomendados(),
          listarEstagiosPorEstagiarioId(usuarioId),
          listarDefesasAluno(usuarioId)
        ]);

        const vagas = dadosRecomendados || [];
        setEstagiosDisponiveis(vagas);

        const estAluno = meusEstagios || [];
        const defAluno = bancas || [];
        const ativosAluno = estAluno.filter(e => e.status?.toLowerCase() === 'em_andamento').length;

        setMetricas([
          {
            titulo: 'Meus Estágios',
            valor: estAluno.length.toString(),
            subtitulo: ativosAluno === 0 ? 'Nenhum em andamento' : ativosAluno === 1 ? '1 em andamento' : `${ativosAluno} em andamento`,
            icone: Briefcase,
            variante: 'azul',
          },
          {
            titulo: 'Bancas Agendadas',
            valor: defAluno.length.toString(),
            subtitulo: defAluno.length > 0 ? 'Defesas ativas no sistema' : 'Nenhuma defesa marcada',
            icone: Clock,
            variante: 'laranja',
          },
          {
            titulo: 'Vagas Disponíveis',
            valor: vagas.length.toString(),
            subtitulo: 'No mural de oportunidades',
            icone: Bookmark,
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
        titulo="Bem-vindo, Estudante"
        subtitulo="Gerencie seus estágios e acompanhe seu progresso."
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {isLoading ? (
          <div className="col-span-full h-35 flex items-center text-gray-500 animate-pulse">
            Carregando métricas do estudante...
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

      <div className="grid grid-col-1 lg:grid-cols-3 estagios mt-10">
        <section className="lg:col-span-2"></section>

        <section className="lg:col-span-1 space-y-3">
          <h2 className="text-xl font-semibold">Estágios Disponíveis</h2>
          {estagiosDisponiveis.length > 0 ? (
            estagiosDisponiveis.map((estagio) => (
              <CardEstagioRecomendado key={estagio.id} estagio={estagio} />   
            ))
          ) : (
            <CardNenhumEstagioDisponivel />
          )}
        </section>
      </div>
    </>
  );
}