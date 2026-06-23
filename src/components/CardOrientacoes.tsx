"use client";
import React from "react";
import {
  X,
  Calendar,
  MapPin,
  Users,
  PlusCircle,
  FileText,
  Download,
  FileUp,
  CloudUpload,
  CheckCircle,
  Building2Icon,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { obterUrlPublicaFotoPerfil } from "@/lib/supabase/functions-select";
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
   const modalRef = useRef<HTMLDivElement>(null); 

  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setModal(false);
      }
    }
    if (Modal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [Modal]);
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
                  className="w-12 h-12 rounded-full object-cover"
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
            <Building2Icon className="w-4 h-4 ml-2 mt-1" />
            <p className="text-gray-600 mb-2 line-clamp-2 font-semibold text-base">
              {empresa}
            </p>
          </div>
          <div className="flex gap-2">
            <CalendarMonthOutlineIcon className="w-4 h-4 ml-2 mt-1" />
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
          <div ref={modalRef} className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col ">
            <div className="p-8 pb-4">
              <div className="flex mb-1 justify-between items-start">
                <h2 className="text-2xl font-bold text-[#004bb5]">
                  Agendar Defesa de Estágio
                </h2>
                <button
                  onClick={() => setModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-5">
                Preencha os detalhes para formalizar o evento acadêmico.
              </p>
              <hr className="border-t border-gray-200 mb-5" />
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-green-700" />
                <h3 className="text-sm font-bold text-green-700 tracking-wide">
                  INFORMAÇÕES DO EVENTO
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col">
                  <label
                    htmlFor="datadefesa"
                    className="text-sm font-medium text-gray-800 mb-1.5"
                  >
                    Data da Defesa
                  </label>
                  <input
                    type="date"
                    name="datadefesa"
                    id="datadefesa"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="localdefesa"
                    className="text-sm font-medium text-gray-800 mb-1.5"
                  >
                    Local da Defesa
                  </label>
                  <div className="relative flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3" />
                    <input
                      type="text"
                      name="localdefesa"
                      id="localdefesa"
                      placeholder="Ex: Auditório 2 ou Link Meet"
                      className="w-full border border-gray-300 rounded-md py-2.5 pr-2.5 pl-9 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 text-gray-700"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-green-700" />
                <h3 className="text-sm font-bold text-green-700 tracking-wide">
                  BANCA EXAMINADORA
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-3">
                <div className="flex flex-col">
                  <label
                    htmlFor="nomebanca"
                    className="text-sm font-medium text-gray-800 mb-1.5"
                  >
                    Nome do Integrante
                  </label>
                  <input
                    type="text"
                    name="nomebanca"
                    id="nomebanca"
                    placeholder="Nome Completo"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 text-gray-700"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="emailbanca"
                    className="text-sm font-medium text-gray-800 mb-1.5"
                  >
                    E-mail Institucional
                  </label>
                  <input
                    type="email"
                    name="emailbanca"
                    id="emailbanca"
                    placeholder="nome@instituicao.edu"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 text-gray-700"
                  />
                </div>
              </div>

              <button className="flex items-center gap-2 text-[#004bb5] text-sm font-medium hover:text-blue-800 mb-8 transition-colors">
                <PlusCircle className="w-4 h-4" /> Adicionar Integrante
              </button>

              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-green-700" />
                <h3 className="text-sm font-bold text-green-700 tracking-wide">
                  DOCUMENTAÇÃO
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-sm font-medium text-gray-800">
                      Ata de Defesa
                    </span>
                    <button className="flex items-center gap-1 text-[#004bb5] text-xs font-semibold hover:underline">
                      <Download className="w-3.5 h-3.5" /> Baixar Modelo
                    </button>
                  </div>
                  <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-white group">
                    <FileUp className="w-6 h-6 text-[#004bb5] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold text-gray-800">
                      Arraste ou clique
                    </span>
                    <span className="text-xs text-gray-500 font-medium uppercase mt-0.5">
                      PDF até 5MB
                    </span>
                    <input type="file" className="hidden" accept=".pdf" />
                  </label>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-1.5">
                    <span className="text-sm font-medium text-gray-800">
                      Relatório Final
                    </span>
                    <button className="flex items-center gap-1 text-[#004bb5] text-xs font-semibold hover:underline">
                      <Download className="w-3.5 h-3.5" /> Baixar Modelo
                    </button>
                  </div>
                  <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-white group">
                    <CloudUpload className="w-6 h-6 text-[#004bb5] mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold text-gray-800">
                      Arraste ou clique
                    </span>
                    <span className="text-xs text-gray-500 font-medium uppercase mt-0.5">
                      PDF até 15MB
                    </span>
                    <input type="file" className="hidden" accept=".pdf" />
                  </label>
                </div>
              </div>
            </div>
            <div className="bg-gray-50/80 px-8 py-5 border-t border-gray-100 flex justify-end items-center gap-6">
              <button
                onClick={() => setModal(false)}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setModal(false);
                }}
                className="px-5 py-2.5 bg-[#0052cc] hover:bg-[#0043a6] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                Confirmar Agendamento
                <CheckCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
