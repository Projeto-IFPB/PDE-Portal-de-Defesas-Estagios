"use client";

import { X } from "lucide-react";

export type EstagioDoCoordenadorData = {
  id: string;
  empresa: string;
  data_de_inicio: string;
  status: string;
  aluno: { id: string; Nome_Completo: string; fotoUrl?: string | null } | null;
  orientador: { id: string; Nome_Completo: string; fotoUrl?: string | null } | null;
};

interface ModalEstagioCoordenadorProps {
  estagio: EstagioDoCoordenadorData;
  onClose: () => void;
}

export default function ModalEstagioCoordenador({ estagio, onClose }: ModalEstagioCoordenadorProps) {
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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
      onClick={onClose}
    >
      <div 
        className="w-full bg-white rounded-t-3xl p-6 shadow-xl animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#004bb5]">Detalhes do Estágio</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <hr className="border-t border-gray-100 mb-5" />

        <div className="space-y-5">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-0.5">Aluno(a)</p>
            <p className="text-base text-gray-900 font-semibold">{estagio.aluno?.Nome_Completo || 'Não informado'}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 font-medium mb-0.5">Empresa</p>
            <p className="text-base text-gray-900 font-semibold">{estagio.empresa || 'Não informada'}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium mb-0.5">Orientador(a)</p>
            <p className="text-base text-gray-900 font-semibold">{estagio.orientador?.Nome_Completo || 'Não informado'}</p>
          </div>

          <div className="flex justify-between items-center pt-5 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">Data de Início</p>
              <p className="text-base text-gray-900 font-semibold">
                {estagio.status?.toLowerCase() === 'pendente' 
                  ? <span className="text-red-500">Pendente</span> 
                  : formatarData(estagio.data_de_inicio)}
              </p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-500 font-medium mb-1">Status</p>
              <span className={`inline-flex px-3 py-1 text-xs font-semibold border rounded-full ${getStatusStyle(estagio.status)}`}>
                {formatarStatusLabel(estagio.status)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}