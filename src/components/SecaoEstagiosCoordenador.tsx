"use client";

import { useEffect, useState } from "react";
import { getEstagiosDoCoordenador } from "@/lib/supabase/functions-select";
import ModalEstagioCoordenador, { EstagioDoCoordenadorData } from "./ModalEstagioCoordenador";
import { Briefcase } from "lucide-react";

interface Props {
  coordenadorId: string;
}

const Avatar = ({ name, url }: { name: string; url?: string | null }) => {
  const nomePadrao = name || "Indefinido";
  const initials = nomePadrao.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  const getBgColor = (text: string) => {
    const colors = ['bg-[#0052cc]', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500'];
    let hash = 0;
    for (let i = 0; i < text.length; i++) hash = text.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  if (url && url !== "sem imagem") {
    return <img src={url} alt={nomePadrao} className="w-8 h-8 rounded-full object-cover shrink-0 border border-gray-100" />;
  }

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-sm ${getBgColor(nomePadrao)}`}>
      {initials}
    </div>
  );
};

export default function SecaoEstagiosCoordenador({ coordenadorId }: Props) {
  const [estagios, setEstagios] = useState<EstagioDoCoordenadorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedEstagio, setSelectedEstagio] = useState<EstagioDoCoordenadorData | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getEstagiosDoCoordenador(coordenadorId);
        setEstagios(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (coordenadorId) {
      loadData();
    }
  }, [coordenadorId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && selectedEstagio !== null) {
        setSelectedEstagio(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedEstagio]);

  const formatarData = (dataIso: string) => {
    if (!dataIso) return "Não informada";
    return new Date(dataIso).toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'em_andamento': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'concluido': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pendente': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatarStatusLabel = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'em_andamento': return 'Em Andamento';
      case 'concluido': return 'Concluído';
      case 'pendente': return 'Pendente';
      default: return status || 'Indefinido';
    }
  };

  // ESTADO: CARREGANDO
  if (loading) return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-50">
          Todos os Estágios do Curso
        </h2>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-500 animate-pulse dark:text-slate-50">
        Carregando estágios do curso...
      </div>
    </div>
  );
  
  // ESTADO: ERRO
  if (error) return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-50">
          Todos os Estágios do Curso
        </h2>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-sm border border-red-200 p-8 text-center text-red-500 dark:bg-slate-900">
        Erro ao carregar dados: {error}
      </div>
    </div>
  );
  
  // ESTADO: VAZIO (NENHUM ESTÁGIO)
  if (estagios.length === 0) return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-50">
          Todos os Estágios do Curso <span className="text-gray-500 font-medium text-lg ml-1">(0)</span>
        </h2>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center dark:bg-slate-900">
        <Briefcase className="w-12 h-12 text-gray-300 mb-3" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-50">Nenhum estágio vinculado</h3>
        <p className="text-gray-500 text-sm dark:text-slate-400">Você ainda não possui estágios sob sua coordenação.</p>
      </div>
    </div>
  );

  const estagiosExibidos = showAll ? estagios : estagios.slice(0, 5);

  // ESTADO: SUCESSO E COM DADOS
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-50">
          Todos os Estágios do Curso <span className="text-2xl font-bold text-gray-800 dark:text-slate-50">({estagios.length})</span>
        </h2>
        
        {estagios.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="hidden md:inline-flex text-sm font-semibold text-[#0052cc] hover:text-blue-800 hover:underline transition-colors focus:outline-none mb-1"
          >
            {showAll ? "Recolher Tabela" : "Ver Relatório Completo"}
          </button>
        )}
      </div>

      {/* CONTAINER DESKTOP */}
      <div className={`hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out dark:bg-slate-900 dark:shadow-slate-800 dark:border-slate-950/80 ${showAll ? "max-h-[600px] overflow-y-auto" : ""}`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-gray-200 dark:bg-slate-950/70 dark:text-slate-400">
              <th className="p-4 pl-6">Aluno</th>
              <th className="p-4">Empresa</th>
              <th className="p-4">Orientador</th>
              <th className="p-4 text-center">Início</th>
              <th className="p-4 text-center pr-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {estagiosExibidos.map((estagio) => (
              <tr key={estagio.id} className="hover:bg-slate-50 transition-colors dark:hover:bg-slate-700">
                <td className="p-4 pl-6 text-gray-900 font-semibold flex items-center gap-3 dark:text-slate-50">
                  <Avatar name={estagio.aluno?.Nome_Completo || ''} url={estagio.aluno?.fotoUrl} />
                  <span className="truncate max-w-[200px]">{estagio.aluno?.Nome_Completo || '-'}</span>
                </td>
                <td className="p-4 text-gray-600 font-medium dark:text-slate-400">{estagio.empresa || '-'}</td>
                <td className="p-4 text-gray-600 font-medium dark:text-slate-400">
                  <div className="flex items-center gap-3">
                    <Avatar name={estagio.orientador?.Nome_Completo || ''} url={estagio.orientador?.fotoUrl} />
                    <span className="truncate max-w-[200px]">{estagio.orientador?.Nome_Completo || '-'}</span>
                  </div>
                </td>
                <td className="p-4 text-center text-gray-600 font-medium whitespace-nowrap dark:text-slate-400">
                  {estagio.status?.toLowerCase() === 'pendente' ? <span className="text-red-500 font-semibold">Pendente</span> : formatarData(estagio.data_de_inicio)}
                </td>
                <td className="p-4 text-center pr-6 whitespace-nowrap dark:text-slate-400">
                  <span className={`inline-flex px-3 py-1 text-xs border font-semibold rounded-full ${getStatusStyle(estagio.status)}`}>
                    {formatarStatusLabel(estagio.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CONTAINER MOBILE */}
      <div className="flex flex-col md:hidden gap-4">
        {estagiosExibidos.map((estagio) => (
          <div key={estagio.id} className="bg-white p-5 flex flex-col gap-4 border border-gray-200 rounded-2xl shadow-sm">
            <div className="flex justify-between items-start gap-3">
              <Avatar name={estagio.aluno?.Nome_Completo || ''} url={estagio.aluno?.fotoUrl} />
              <div className="min-w-0 flex-1 mt-0.5">
                <h4 className="font-semibold text-gray-900 truncate leading-tight">{estagio.aluno?.Nome_Completo || 'Aluno Indefinido'}</h4>
                <p className="text-xs text-gray-500 truncate mt-0.5">{estagio.empresa || 'Empresa Indefinida'}</p>
              </div>
              <span className={`shrink-0 inline-flex px-2 py-1 text-[10px] uppercase font-bold border rounded-full ${getStatusStyle(estagio.status)}`}>
                {formatarStatusLabel(estagio.status)}
              </span>
            </div>
            
            <button
              onClick={() => setSelectedEstagio(estagio)}
              className="w-full py-2.5 px-4 text-sm font-semibold text-[#0052cc] border border-[#0052cc]/20 rounded-xl bg-blue-50/30 hover:bg-blue-50 transition-colors mt-1"
            >
              Ver Detalhes
            </button>
          </div>
        ))}

        {estagios.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-3.5 mt-2 text-sm font-semibold text-[#0052cc] bg-white hover:bg-gray-50 rounded-2xl border border-gray-200 shadow-sm transition-colors flex items-center justify-center focus:outline-none"
          >
            {showAll ? "Recolher Relatório" : "Ver Relatório Completo"}
          </button>
        )}
      </div>

      {selectedEstagio && (
        <ModalEstagioCoordenador 
          estagio={selectedEstagio} 
          onClose={() => setSelectedEstagio(null)} 
        />
      )}
    </div>
  );
}