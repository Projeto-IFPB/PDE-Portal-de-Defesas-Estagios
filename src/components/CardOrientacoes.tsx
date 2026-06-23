"use client";

import { useEffect, useState } from "react";
import { obterUrlPublicaFotoPerfil } from "@/lib/supabase/functions-select";
import Building2Icon from "@iconify-react/lucide/building-2";
import CalendarMonthOutlineIcon from "@iconify-react/material-symbols/calendar-month-outline";
import FileTextIcon from "@iconify-react/lucide/file-text";
import UsersRoundIcon from "@iconify-react/lucide/users-round";
import CirclePlusIcon from "@iconify-react/lucide/circle-plus";

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
    colorClasses: "bg-slate-400 text-slate-800 border-gray-200",
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
  const [Modal, setModal] = useState(false);
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
          <div className="flex gap-2 flex-1 min-w-0">
            <div className="shrink-0">
              {fotoUrl && (
                <img
                  src={fotoUrl}
                  alt={nomeEstagiario}
                  className="w-13 h-13 rounded-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="text-xl font-semibold text-gray-900 truncate">
                {nomeEstagiario}
              </h3>
              <p className="truncate text-gray-600 text-sm">
                {emailEstagiario}
              </p>
            </div>
          </div>
          <div className="shrink-0 pt-1">
            <span
              className={`px-2.5 py-1 text-xs font-medium border rounded-full ${currentStatus.colorClasses}`}
            >
              {currentStatus.label}
            </span>
          </div>
        </div>
        <hr className="border-t border-gray-200 mb-6" />
        <div>
          <div className="flex gap-2">
            <Building2Icon height="1em" className="ml-2" />
            <p className="text-gray-600 mb-2 line-clamp-2 font-semibold text-base">
              {empresa}
            </p>
          </div>
          <div className="flex gap-2">
            <CalendarMonthOutlineIcon className="w-4 h-4 ml-2" />{" "}
            <p className="text-gray-600 mb-2 line-clamp-2 font-semibold text-base">
              Data de Inicio: {dataFormatada}
            </p>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-200 mb-3" />
      <div className="flex gap-3 w-full">
        <button
          onClick={() => onVerDetalhes && onVerDetalhes(id)}
          className="flex-1 py-2 px-4 bg-blue-100 hover:bg-transparent hover:border-blue-100 hover:border-2 text-blue-800 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-h-15"
        >
          Ver Detalhes
        </button>
        <button
          onClick={() => setModal(true)}
          className="flex-1 py-2 px-4 text-blue-800 border-2 border-solid border-blue-100 hover:bg-blue-100  text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Agendar Defesa
        </button>
      </div>
      {/*modalzinho*/}
      {Modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-xl ">
            <div className="flex mb-4 justify-between ">
              <h2 className="text-xl font-bold text-blue-600">
                Agendar Defesa de Estagio
              </h2>
              <button
                onClick={() => setModal(false)}
                className="text-gray-600 "
              >
                X
              </button>
            </div>
            <p className="mb-6">
              Preencha os detalhes para formalizar o evento acadêmico.{" "}
              {nomeEstagiario}?
            </p>
            <hr className="border-t border-gray-200 mb-3" />
            <div className="flex">
              <CalendarMonthOutlineIcon className="w-4 h-4 text-green-600 " />
              <h2 className="text-green-600">INFORMAÇÕES DO EVENTO</h2>
            </div>
            <div className="flex justify-between mb-4">
              <div className="flex flex-col">
                <label htmlFor="datadefesa">Data da Defesa</label>
                <input
                  type="date"
                  name="datadefesa"
                  itemID="datadefesa"
                  className="border-2 border-solid border-blue-100"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="localdefesa">Local da Defesa</label>
                <input
                  type="text"
                  name="localdefesa"
                  itemID="localdefesa"
                  className="border-2 border-solid border-blue-100"
                  placeholder="Ex: Auditorio 2 ou link Meet"
                />
              </div>
            </div>
            <div className="flex">
              <UsersRoundIcon height="1em" className="text-green-600" />
              <h2 className="text-green-600">BANCA EXAMINADORA</h2>
            </div>
            <div className="flex justify-between mb-4">
              <div className="flex flex-col">
                <label htmlFor="nomebanca">Nome do Integrante</label>
                <input
                  type="text"
                  name="nomebanca"
                  itemID="nomebanca"
                  className="border-2 border-solid border-blue-100"
                  placeholder="Nome Completo"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="emailbanca">Local da Defesa</label>
                <input
                  type="text"
                  name="emailbanca"
                  itemID="emailbanca"
                  className="border-2 border-solid border-blue-100"
                  placeholder="nome@instituicao.edu"
                />
              </div>
            </div>
            <button className="text-blue-600 flex">
              <CirclePlusIcon height="1em" /> Adicionar Integrante
            </button>
            <div className="flex">
              <FileTextIcon height="1em" className="text-green-600" />
              <h2 className="text-green-600">DOCUMENTAÇÃO</h2>
            </div>
            <div className="flex justify-between mb-4">
              <div className="flex flex-col">
                <label htmlFor="atadefesa">Ata de Defesa</label>
                <input
                  type="file"
                  name="atadefesa"
                  itemID="atadefesa"
                  className="border-2 border-solid border-blue-100"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="relatoriofinal">Relatório Final</label>
                <input
                  type="file"
                  name="relatoriofinal"
                  itemID="relatoriofinal"
                  className="border-2 border-solid border-blue-100"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModal(false)}
                className="px-4 py-2 text-gray-600 border rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
