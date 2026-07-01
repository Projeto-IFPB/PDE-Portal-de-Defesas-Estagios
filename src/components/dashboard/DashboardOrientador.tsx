"use client";

import { useEffect, useState } from "react";
import { Briefcase, Users, ClipboardList, LucideIcon } from "lucide-react";
import CabecalhoBoasVindas from "@/components/CabecalhoBoasVindas";
import CardInformativo, { VarianteCard } from "@/components/CardInformativo";
import OrientacaoCard from "@/components/CardOrientacoes";
import { listarEstagiosPorOrientadorId, listarDefesasPorOrientadorId } from "@/lib/supabase/functions-select";
import { deletarEstagio } from "@/lib/supabase/functions-delete"
import { useOrientacoes } from "@/hooks/useOrientacoes";
import { useRouter } from "next/navigation";

interface DadosCardDashboard {
  titulo: string;
  valor: React.ReactNode;
  subtitulo?: string;
  icone: LucideIcon;
  variante: VarianteCard;
}

interface DefesaItem {
  id: string;
  dataDefesa: string;
  horario: string;
  local: string;
  alunoNome: string;
}

export default function DashboardOrientador({ usuarioId }: { usuarioId: string }) {
  const router = useRouter();
  const [metricas, setMetricas] = useState<DadosCardDashboard[]>([]);
  const [defesas, setDefesas] = useState<DefesaItem[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    async function carregarDados() {
      setIsLoading(true);
      try {
        // --- 1. CARREGA AS MÉTRICAS DO PAINEL ---
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

        // --- 2. CARREGA AS PRÓXIMAS DEFESAS USANDO A NOVA FUNÇÃO ---
        const defesasDB = await listarDefesasPorOrientadorId(usuarioId);

        // Formatamos os dados respeitando a capitalização correta do seu banco
        const formatadas: DefesaItem[] = defesasDB.map((d: any) => ({
          id: d.id,
          dataDefesa: d.data_defesa,
          horario: d.horario_defesa?.slice(0, 5) || "", 
          local: d.local_defesa || "Não definido",
          alunoNome: d.Estagios?.Usuarios?.Nome_Completo || "Aluno não identificado",
        }));
        
        setDefesas(formatadas);

      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-slate-50">Minhas Orientações</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orientacoes.slice(0, 3).map((orientacao) => (
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

      {/* Componente de próximas defesas posicionado no final do fluxo */}
      <section className="mt-10 mb-10">
        {isLoading ? (
          <div className="h-20 flex items-center text-gray-500 animate-pulse dark:text-slate-400">
            Carregando próximas defesas...
          </div>
        ) : (
          <ProximasDefesas defesas={defesas} />
        )}
      </section>
    </>
  );
}

function ProximasDefesas({ defesas }: { defesas: DefesaItem[] }) {
  const formatarDataBadge = (dataStr: string) => {
    if (!dataStr) return { dia: "00", mes: "---" };
    const data = new Date(`${dataStr}T00:00:00`);
    const dia = data.getDate().toString().padStart(2, '0');
    const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const mes = meses[data.getMonth()];
    return { dia, mes };
  };

  if (defesas.length === 0) {
    return (
      <div className="bg-[#FAFBFD] border border-gray-100 rounded-2xl p-6 shadow-sm w-full dark:bg-slate-900 dark:border-slate-800">
        <h2 className="text-xl font-bold text-gray-800 mb-2 dark:text-slate-50">Próximas Defesas Agendadas</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400">Nenhuma banca ou defesa agendada no momento.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFBFD] border border-gray-100 rounded-2xl p-6 shadow-sm w-full dark:bg-slate-900 dark:border-slate-800">
      <h2 className="text-xl font-bold text-gray-800 mb-6 dark:text-slate-50">Próximas Defesas Agendadas</h2>
      
      <div className="flex flex-col md:flex-row gap-4 w-full overflow-x-auto">
        {defesas.map((defesa, index) => {
          const { dia, mes } = formatarDataBadge(defesa.dataDefesa);
          const isFirst = index === 0;

          return (
            <div 
              key={defesa.id} 
              className="flex items-center gap-4 bg-[#F1F3F5] p-4 rounded-xl flex-1 border border-gray-200/40 
              min-w-65 dark:bg-slate-800 dark:border-slate-700"
            >
              <div 
                className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl font-bold transition-colors ${
                  isFirst 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-[#E9ECEF] text-[#6C757D] dark:bg-slate-700 dark:text-slate-300' 
                }`}
              >
                <span className="text-[10px] tracking-wider font-semibold leading-none">{mes}</span>
                <span className="text-xl font-extrabold leading-none mt-1">{dia}</span>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-gray-800 text-sm md:text-base dark:text-slate-100">
                  {defesa.alunoNome}
                </span>
                <span className="text-xs text-gray-500 mt-0.5 dark:text-slate-400">
                  {defesa.local} - {defesa.horario}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}