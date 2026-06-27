"use client";

import { useEffect, useState } from "react";
import { Briefcase, Users, ClipboardList, GraduationCap, LucideIcon } from "lucide-react";
import CabecalhoBoasVindas from "@/components/CabecalhoBoasVindas";
import CardInformativo, { VarianteCard } from "@/components/CardInformativo";
import OrientacaoCard from "@/components/CardOrientacoes";
import SecaoEstagiosCoordenador from "@/components/SecaoEstagiosCoordenador";
import { listarEstagiosPorCoordenadorId } from "@/lib/supabase/functions-select";
import { useOrientacoes } from "@/hooks/useOrientacoes";

interface DadosCardDashboard {
  titulo: string;
  valor: React.ReactNode;
  subtitulo?: string;
  icone: LucideIcon;
  variante: VarianteCard;
}

export default function DashboardCoordenador({ usuarioId }: { usuarioId: string }) {
  const [metricas, setMetricas] = useState<DadosCardDashboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { orientacoes } = useOrientacoes();

  useEffect(() => {
    async function carregarDados() {
      setIsLoading(true);
      try {
        const estagiosCoordDB = await listarEstagiosPorCoordenadorId(usuarioId) || [];
        const ativosCoo = estagiosCoordDB.filter(e => e.status?.toLowerCase() === 'em_andamento').length;
        const pendentesCoo = estagiosCoordDB.filter(e => e.status?.toLowerCase() === 'pendente').length;
        const concluidosCoo = estagiosCoordDB.filter(e => e.status?.toLowerCase() === 'concluido').length;

        setMetricas([
          {
            titulo: 'Estágios em Andamento',
            valor: ativosCoo.toString(),
            subtitulo: 'Acompanhamento regular',
            icone: Users,
            variante: 'azul',
          },
          {
            titulo: 'Estágios Pendentes',
            valor: pendentesCoo.toString(),
            subtitulo: pendentesCoo > 0 ? 'Necessitam de revisão' : 'Nenhuma pendência ativa',
            icone: ClipboardList,
            variante: 'laranja',
          },
          {
            titulo: 'Estágios Concluídos',
            valor: concluidosCoo.toString(),
            subtitulo: 'Finalizados com sucesso',
            icone: GraduationCap,
            variante: 'verde',
          },
          {
            titulo: 'Total de Estágios',
            valor: estagiosCoordDB.length.toString(),
            subtitulo: 'Registrados no seu curso',
            icone: Briefcase,
            variante: 'roxo',
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

  const gridColunasDesktop = metricas.length >= 4 ? 'lg:grid-cols-2 xl:grid-cols-4' : 'lg:grid-cols-3';

  return (
    <>
      <CabecalhoBoasVindas 
        titulo="Bem-vindo, Coordenador"
        subtitulo="Gerencie o curso e acompanhe o progresso acadêmico."
      />

      <section className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${gridColunasDesktop} lg:gap-6`}>
        {isLoading ? (
          <div className="col-span-full h-35 flex items-center text-gray-500 animate-pulse dark:text-slate-400">
            Carregando métricas do coordenador...
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

      <section className="mt-10 mb-8">
        <SecaoEstagiosCoordenador coordenadorId={usuarioId} />
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Minhas Orientações</h2>
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