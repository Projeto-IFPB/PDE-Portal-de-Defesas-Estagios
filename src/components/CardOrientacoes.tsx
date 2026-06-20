"use client";

import { useEffect, useState } from "react";
import { obterUrlPublicaFotoPerfil } from "@/lib/supabase/functions-select";
import Building2Icon from "@iconify-react/lucide/building-2";
import CalendarMonthOutlineIcon from "@iconify-react/material-symbols/calendar-month-outline";

export const handleVerDetalhes = (id: string) => {
  console.log("Visualizando estágio ID:", id);
};
// Tipagem alinhada com o que você provavelmente tem no banco de dados
export type StatusEstagio = "pendente" | "em_andamento" | "concluido";

interface OrientacaoCardProps {
  id: string;
  emailEstagiario: string;
  nomeEstagiario: string;
  empresa: string;
  data: string;
  status: StatusEstagio;
  onVerDetalhes?: (id: string) => void;
  foto_perfil?: string;
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
    colorClasses: "bg-emerald-300 text-green-800 border-green-200",
  },
  concluido: {
    label: "Concluído",
    colorClasses:
      "bg-slate-400 text-slate-800 border-gray-200",
  },
};

export default function OrientacaoCard({
  id,
  nomeEstagiario,
  emailEstagiario,
  empresa,
  data,
  status,
  onVerDetalhes,
  foto_perfil,
}: OrientacaoCardProps) {
  const currentStatus = statusConfig[status];
  const dataFormatada = new Date(data).toLocaleDateString("pt-BR", {
    timeZone: "UTC", // O 'UTC' evita que a data mude de dia por causa do fuso horário
  });
  const [fotoUrl, setFotoUrl] = useState<string | null>(null); // Estado para a foto

  useEffect(() => {
    async function carregarFoto() {
      const padrao = await obterUrlPublicaFotoPerfil("sem_foto_perfil.jpg");
      setFotoUrl(
        foto_perfil && foto_perfil !== "sem imagem" ? foto_perfil : padrao
      );
    }
    carregarFoto();
  }, [foto_perfil]);

  return (
    <div className="flex flex-col justify-between p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 min-h-70">
      <div>
        <div className="flex justify-between mb-3">
          <div className="flex gap-2">
            <div className="shrink-0">
              {fotoUrl && (
                <img
                  src={fotoUrl}
                  alt={nomeEstagiario}
                  className="w-[3.5rem] h-[3.5rem] rounded-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 overflow-hidden text-ellipsis">
                {nomeEstagiario}
              </h3>
              <p className="truncate overflow-hidden text-ellipsis">
                {emailEstagiario}
              </p>
            </div>
          </div>
          <div>
            <span
              className={`px-2.5 py-1 text-xs font-medium border rounded-full ${currentStatus.colorClasses}`}
            >
              {currentStatus.label}
            </span>
          </div>
        </div>
        <hr className="border-t-1 border-gray-200 mb-6" />
        <div>
          <div className="flex gap-2">
            <Building2Icon height="1em" className="ml-2" />
            <p className="text-sm text-gray-600 mb-2 line-clamp-2 font-semibold text-base">
              {empresa}
            </p>
          </div>
          <div className="flex gap-2">
            <CalendarMonthOutlineIcon className="w-4 h-4 ml-2" />{" "}
            <p className="text-sm text-gray-600 mb-2 line-clamp-2 font-semibold text-base">
              Data de Inicio: {dataFormatada}
            </p>
          </div>
        </div>
      </div>
      <hr className="border-t-1 border-gray-200 mb-3" />
      <div className="flex justify-evenly gap-6">
        <button
          onClick={() => onVerDetalhes && onVerDetalhes(id)}
          className="py-2 px-4 bg-blue-100 hover:bg-transparent hover:border-blue-100 hover:border-2 text-blue-800 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-15"
        >
          Ver Detalhes
        </button>
        <button className="py-2 px-4 text-blue-800 border-2 border-solid border-blue-100 hover:bg-blue-100  text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Agendar Defesa
        </button>
      </div>
    </div>
  );
}
