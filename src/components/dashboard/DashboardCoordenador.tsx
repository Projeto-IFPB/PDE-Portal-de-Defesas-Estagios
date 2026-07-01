"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Users,
  ClipboardList,
  GraduationCap,
  LucideIcon,
} from "lucide-react";
import ModalEstagioRecomendado from "../ModalEstagioRecomendado";
import CabecalhoBoasVindas from "@/components/CabecalhoBoasVindas";
import CardInformativo, { VarianteCard } from "@/components/CardInformativo";
import OrientacaoCard from "@/components/CardOrientacoes";
import SecaoEstagiosCoordenador from "@/components/SecaoEstagiosCoordenador";
import { listarEstagiosPorCoordenadorId } from "@/lib/supabase/functions-select";
import { deletarEstagio } from "@/lib/supabase/functions-delete"
import { useOrientacoes } from "@/hooks/useOrientacoes";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";


interface DadosCardDashboard {
  titulo: string;
  valor: React.ReactNode;
  subtitulo?: string;
  icone: LucideIcon;
  variante: VarianteCard;
}

export default function DashboardCoordenador({
  usuarioId,
}: {
  usuarioId: string;
}) {
    const router = useRouter();
  const [metricas, setMetricas] = useState<DadosCardDashboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { orientacoes, setOrientacoes } = useOrientacoes();
  const handleExcluir = async (id: string) => {
    try {
      await deletarEstagio(id);
      setOrientacoes((prev) => prev.filter((e) => e.id !== id));
      router.refresh(); 
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  }

  async function carregarDados() {
    setIsLoading(true);
    try {
      const estagiosCoordDB =
        (await listarEstagiosPorCoordenadorId(usuarioId)) || [];
      const ativosCoo = estagiosCoordDB.filter(
        (e) => e.status?.toLowerCase() === "em_andamento"
      ).length;
      const pendentesCoo = estagiosCoordDB.filter(
        (e) => e.status?.toLowerCase() === "pendente"
      ).length;
      const concluidosCoo = estagiosCoordDB.filter(
        (e) => e.status?.toLowerCase() === "concluido"
      ).length;

      setMetricas([
        {
          titulo: "Estágios em Andamento",
          valor: ativosCoo.toString(),
          subtitulo: "Acompanhamento regular",
          icone: Users,
          variante: "azul",
        },
        {
          titulo: "Estágios Pendentes",
          valor: pendentesCoo.toString(),
          subtitulo:
            pendentesCoo > 0
              ? "Necessitam de revisão"
              : "Nenhuma pendência ativa",
          icone: ClipboardList,
          variante: "laranja",
        },
        {
          titulo: "Estágios Concluídos",
          valor: concluidosCoo.toString(),
          subtitulo: "Finalizados com sucesso",
          icone: GraduationCap,
          variante: "verde",
        },
        {
          titulo: "Total de Estágios",
          valor: estagiosCoordDB.length.toString(),
          subtitulo: "Registrados no seu curso",
          icone: Briefcase,
          variante: "roxo",
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (usuarioId) carregarDados();
  }, [usuarioId]);

  const gridColunasDesktop =
    metricas.length >= 4 ? "lg:grid-cols-2 xl:grid-cols-4" : "lg:grid-cols-3";

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
        <CabecalhoBoasVindas
          titulo="Bem-vindo, Coordenador"
          subtitulo="Geerencie o curso e acompanhe o progresso acadêmico."
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1.5 w-full md:w-auto px-4 py-3 text-sm font-medium text-white transition-colors bg-[#185adb] rounded-lg shadow-sm cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusCircle size={18} strokeWidth={2} />
          Cadastrar Nova Vaga
        </button>
      </div>
      {isModalOpen && (
        <ModalEstagioRecomendado
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={carregarDados}
        />
      )}

      <section
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${gridColunasDesktop} lg:gap-6`}
      >
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-slate-50">
          Minhas Orientações
        </h2>
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
              onDelete={() => handleExcluir(orientacao.id)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
