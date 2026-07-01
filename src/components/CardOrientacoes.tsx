"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2Icon, CalendarX, Trash2 } from "lucide-react";
import { obterUrlPublicaFotoPerfil } from "@/lib/supabase/functions-select";
import CalendarMonthOutlineIcon from "@iconify-react/material-symbols/calendar-month-outline";
import ModalOrientacao from "./ModalAgendarDefesa";

export type StatusEstagio = "pendente" | "em_andamento" | "concluido";

interface OrientacaoCardProps {
  id: string;
  emailEstagiario: string;
  nomeEstagiario: string;
  empresa: string;
  data: string;
  status: StatusEstagio;
  foto_perfil?: string;
  onDelete?: () => Promise<void>;
}

// Configuração visual dinâmica baseada no status do estágio
const statusConfig: Record<
  StatusEstagio,
  { label: string; colorClasses: string }
> = {
  pendente: {
    label: "Pendente",
    colorClasses: "bg-red-100 text-red-800 border-red-200",
  },
  em_andamento: {
    label: "Em Andamento",
    colorClasses: "bg-blue-100 text-blue-800 border-blue-200",
  },
  concluido: {
    label: "Concluído",
    colorClasses: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
};

export default function OrientacaoCard({
  id,
  nomeEstagiario,
  emailEstagiario,
  empresa,
  data,
  status,
  foto_perfil,
  onDelete,
}: OrientacaoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const currentStatus = statusConfig[status];
  const dataFormatada = new Date(data).toLocaleDateString("pt-BR", {
    timeZone: "UTC", // O 'UTC' evita que a data mude de dia por causa do fuso horário
  });
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);

  useEffect(() => {
    async function carregarFoto() {
      const padrao = await obterUrlPublicaFotoPerfil("sem_foto_perfil.jpg");
      setFotoUrl(
        foto_perfil && foto_perfil !== "sem imagem" ? foto_perfil : padrao
      );
    }
    carregarFoto();
  }, [foto_perfil]);

  const handleNavegarDetalhes = () => {
    router.push(`/dashboard/alunos/${id}`);
  };

  return (
    <div className="flex flex-col justify-between p-5 bg-white  rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 min-h-70 dark:bg-slate-900 dark:shadow-slate-800">
      <div>
        <div className="flex justify-between mb-3">
          <div className="flex gap-2 flex-1 min-w-0">
            <div className="shrink-0">
              {fotoUrl && (
                <img
                  src={fotoUrl}
                  alt={nomeEstagiario}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 truncate dark:text-slate-50">
                {nomeEstagiario}
              </h3>
              <p className="truncate text-gray-600 text-sm dark:text-slate-400">
                {emailEstagiario}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <span
              className={`px-2.5 py-1 text-xs font-medium border rounded-full ${currentStatus.colorClasses}`}
            >
              {currentStatus.label}
            </span>
            {status === "pendente" && onDelete && (
              <button
                onClick={() => setIsDeleteConfirmOpen(true)}
                className="p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-full transition-colors duration-200 dark:hover:bg-red-900/20"
                title="Excluir orientação"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <hr className="border-t border-gray-200 mb-6" />
        <div>
          <div className="flex gap-2">
            <Building2Icon className="w-4 h-4 ml-2 mt-1 dark:text-slate-400" />
            <p className="text-gray-600 mb-2 line-clamp-2 font-semibold text-base dark:text-slate-400">
              {empresa}
            </p>
          </div>
          <div className="flex gap-2">
            <CalendarMonthOutlineIcon className="w-4 h-4 ml-2 mt-1 dark:text-slate-400" />
            <p className="text-gray-600 mb-2 line-clamp-2 font-semibold text-base dark:text-slate-400">
              Data de Inicio:{" "}
              {status === "pendente" ? (
                <span className="text-red-500 font-semibold">Pendente</span>
              ) : (
                dataFormatada
              )}
            </p>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-200 mb-3" />
      <div className="flex gap-3 w-full">
        <button
          onClick={handleNavegarDetalhes}
          className="flex-1 py-2 px-4 bg-blue-100 hover:bg-transparent border-2 border-transparent hover:border-blue-700 text-blue-800 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-15 cursor-pointer dark:bg-blue-900/40 dark:text-blue-400 dark:border-transparent
      dark:hover:bg-transparent dark:hover:border-slate-700 dark:hover:text-blue-400"
        >
          Ver Detalhes
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 py-2 px-4 text-blue-800 border-2 border-solid border-blue-100 hover:bg-blue-100  text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-transparent dark:text-blue-400 dark:border-slate-700
      dark:hover:bg-blue-900/40 dark:hover:border-transparent dark:hover:text-blue-400"
        >
          Agendar Defesa
        </button>
        {/* Modal Confirmar Exclusao */}
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 p-6 rounded-xl shadow-2xl max-w-sm w-full transition-all">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-2">
                Confirmar Exclusão
              </h3>

              <p className="text-gray-600 dark:text-slate-400 mb-6">
                Tem certeza que deseja excluir esta orientação pendente? Esta
                ação não pode ser desfeita.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setIsDeleteConfirmOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  disabled={isDeleting}
                  onClick={async () => {
                    try {
                      setIsDeleting(true);
                      await onDelete?.();
                      setIsDeleteConfirmOpen(false);
                    } catch (error) {
                      console.error("Erro ao deletar:", error);
                      alert("Ocorreu um erro ao tentar excluir.");
                    } finally {
                      setIsDeleting(false);
                    }
                  }}
                  className={`px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isDeleting ? "Excluindo..." : "Confirmar Exclusão"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/*modalzinho*/}
      {isModalOpen && (
        <ModalOrientacao
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          estagioId={id}
        />
      )}
    </div>
  );
}

export function CardNenhumAluno() {
  return (
    <>
      <div className="grid col-span-1 md:col-span-2 lg:col-span-3 bg-white py-10 justify-center items-center rounded-lg dark:bg-slate-900">
        <div className="bg-blue-100 p-6 m-auto rounded-full mb-4">
          <CalendarX className="w-10 h-10 text-blue-800" strokeWidth={1.2} />
        </div>
        <div className="max-w-80 text-center">
          <h1 className="text-xl font-semibold mb-3 dark:text-slate-50">
            Você não orienta nenhum aluno
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Você não orienta nenhum aluni. Novas orientações aparecerão aqui.
          </p>
        </div>
      </div>
    </>
  );
}
