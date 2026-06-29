"use client";

import { useEffect, useState } from "react";
import { Briefcase, Clock, Bookmark, LucideIcon } from "lucide-react";
import CabecalhoBoasVindas from "@/components/CabecalhoBoasVindas";
import CardInformativo, { VarianteCard } from "@/components/CardInformativo";
import { CardEstagioRecomendado, CardNenhumEstagioDisponivel } from "@/components/CardEstagioRecomendado";
import { listarEstagiosRecomendados, listarEstagiosPorEstagiarioId, listarDefesasAluno, buscarUsuarioPorId } from "@/lib/supabase/functions-select";
import { EstagioRecomendado, Estagio } from "@/lib/supabase/interfaces";
  import { PlusCircle } from "lucide-react";
import ModalEstagio from "@/components/ModalCadastroEstagio";
import { CardEstagioAluno, CardSemEstagios } from "../CardEstagioAluno";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orientadores, setOrientadores] = useState<Record<string, string>>({});
  const [meusEstagios, setMeusEstagios] = useState<Estagio[]>([]);



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
        setMeusEstagios(estAluno);
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

 useEffect(() => {
    if (usuarioId) carregarDados();
  }, [usuarioId]);

  useEffect(() => {
    async function carregarOrientadores() {
      const mapaOrientadores: Record<string, string> = {};

      await Promise.all(meusEstagios.map(async (estagio) => {
        const orientador = await buscarUsuarioPorId(estagio.Id_orientador);

        if (orientador) {
          mapaOrientadores[estagio.Id_orientador] = orientador.Nome_Completo;
        }
      })
    );
    setOrientadores(mapaOrientadores);
    }
    if (meusEstagios.length > 0) {
      carregarOrientadores();
    }
  }, [meusEstagios]);

  return (
    <>
    <div className="flex items-center justify-between">
      <CabecalhoBoasVindas 
        titulo="Bem-vindo, Estudante"
        subtitulo="Gerencie seus estágios e acompanhe seu progresso."
      />
      <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-medium text-white transition-colors bg-[#185adb] rounded-lg shadow-sm cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusCircle size={18} strokeWidth={2} />
          Cadastrar Novo Estágio
        </button>
      </div>
      {isModalOpen && (
        <ModalEstagio
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={carregarDados}
          Id_usuario={usuarioId}
        />
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {isLoading ? (
          <div className="col-span-full h-35 flex items-center text-gray-500 animate-pulse dark:text-slate-400">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 estagios mt-10 gap-6">
        <section className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-6 dark:text-slate-400">
            Meus Estágios
          </h2>
            <div className="space-y-4">
              {meusEstagios.length > 0 ? (
                meusEstagios.map((estagio) => (
                  <CardEstagioAluno
                    key={estagio.id}
                    estagio={estagio}
                    orientador={orientadores[estagio.Id_orientador]}
                    curso={estagio.curso ?? "Não Informado"}
                  />
                ))
              ) : (
                <CardSemEstagios />
              )}
            </div>
        </section>

        <section className="lg:col-span-1 space-y-3">
          <h2 className="text-xl font-semibold dark:text-slate-400">Estágios Disponíveis</h2>
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