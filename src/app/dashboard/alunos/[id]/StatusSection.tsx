'use client';

import { useState, useTransition } from "react";
import { aprovarEstagioAction } from "./actions";

interface StatusSectionProps {
  estagioId: string;
  statusRaw: string;
  statusConfig: Record<string, { label: string; classes: string }>;
}

export function StatusSection({ estagioId, statusRaw, statusConfig }: StatusSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const statusAtual = statusRaw 
    ? statusConfig[statusRaw.toLowerCase()] 
    : { label: "Sem Status", classes: "bg-gray-100 text-gray-600 border-gray-200" };

  const handleConfirmarAprovacao = () => {
    startTransition(async () => {
      try {
        await aprovarEstagioAction(estagioId);
        setIsModalOpen(false);
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao aprovar o estágio. Tente novamente.");
      }
    });
  };

  return (
    <>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`px-3 py-1 border text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all ${statusAtual.classes}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {statusAtual.label}
        </span>

        {statusRaw?.toLowerCase() === "pendente" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-semibold rounded-full shadow-sm transition-all cursor-pointer"
          >
            Aprovar Estágio
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs select-none">
          {/* Container do Modal com suporte ao Dark Mode */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full shadow-xl border border-gray-100 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-150">
            <h4 className="text-lg font-bold text-gray-900 dark:text-slate-50 mb-2">Confirmar Aprovação</h4>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">
              Tem certeza que deseja aprovar este estágio? O status será alterado para <span className="font-semibold text-emerald-600 dark:text-emerald-400">Em Andamento</span>.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarAprovacao}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isPending ? "Aprovando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}