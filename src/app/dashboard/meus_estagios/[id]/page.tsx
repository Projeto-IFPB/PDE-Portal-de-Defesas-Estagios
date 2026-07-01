"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import CalendarIcon from "@iconify-react/mdi/calendar";
import AccountIcon from "@iconify-react/mdi/account";
import ClockIcon from "@iconify-react/mdi/clock-outline";


import {
  buscarEstagioPorId,
  buscarUsuarioPorId,
  obterDocumentoDoEstagio
} from "@/lib/supabase/functions-select";

import { Estagio } from "@/lib/supabase/interfaces";

const statusConfig = {
  pendente: {
    label: "Pendente",
    classes: "bg-red-100 text-red-700",
  },
  em_andamento: {
    label: "Em andamento",
    classes: "bg-green-100 text-green-700",
  },
  concluido: {
    label: "Concluído",
    classes: "bg-gray-100 text-gray-700",
  },
};



export default function PaginaDetalhesEstagio() {
  const { id } = useParams();
  const router = useRouter();
  const [estagio, setEstagio] = useState<Estagio | null>(null);
  const [orientador, setOrientador] = useState("");
  const [coordenador, setCoordenador] = useState("");

  

  useEffect(() => {
  async function carregarEstagio() {
    if (!id) return;

    const dados = await buscarEstagioPorId(id as string);

    if (!dados) return;

    setEstagio(dados);

    if (!dados.Id_orientador || !dados.Id_coordenador) return;

    const [dadosOrientador, dadosCoordenador] = await Promise.all([
      buscarUsuarioPorId(dados.Id_orientador),
      buscarUsuarioPorId(dados.Id_coordenador),
    ]);

    setOrientador(dadosOrientador?.Nome_Completo ?? "");
    setCoordenador(dadosCoordenador?.Nome_Completo ?? "");
  }

  carregarEstagio();
}, [id]);

  async function visualizarDocumento(tipo: string) {
  if (!estagio) return;

  const url = await obterDocumentoDoEstagio(estagio.id, tipo);

  if (!url) {
    alert("Documento não encontrado.");
    return;
  }

  window.open(url, "_blank");
}

  if (!estagio) {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <p className="text-gray-500">Carregando estágio...</p>
    </div>
  );
}

    const dataInicio = new Date(estagio.data_de_inicio).toLocaleDateString("pt-BR", {
    timeZone: "UTC",
  });

    const dataFim = estagio.previsao_data_fim
  ? new Date(estagio.previsao_data_fim).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    })
  : "Não informado";

  const status = statusConfig[estagio.status as "pendente" | "em_andamento" | "concluido"];



  return (
  <div className="max-w-5xl mx-auto p-8 space-y-6">

    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm p-8">
      <button
        onClick={() => router.back()}
        className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
      >
        <ArrowLeft size={18}/>
        Voltar
      </button>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold dark:text-white">
            {estagio.empresa}
          </h1>

          <p className="text-gray-500 mt-1">
            Estágio em {estagio.curso}
          </p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${status.classes}`}
        >
          {status.label}
        </span>
      </div>

     <hr className="my-6 border-gray-200 dark:border-slate-700" />

      <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 flex gap-3 items-center">
        <AccountIcon className="w-5 h-5 text-blue-600" />

        <div>
          <p className="text-xs text-gray-500 uppercase">
            Orientador
          </p>

          <p className="font-semibold dark:text-white">
            {orientador || "Não informado"}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 flex gap-3 items-center">
        <AccountIcon className="w-5 h-5 text-blue-600" />

        <div>
          <p className="text-xs text-gray-500 uppercase">
            Coordenador
          </p>

          <p className="font-semibold dark:text-white">
            {coordenador || "Não informado"}
          </p>
        </div>
      </div>
        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 flex gap-3 items-center">
            <CalendarIcon className="w-5 h-5 text-blue-600"/>

            <div>
                <p className="text-xs text-gray-500 uppercase">
                    Data de início
                </p>

                <p className="font-semibold dark:text-white">
                    {dataInicio}
                </p>
            </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 flex gap-3 items-center">
          <ClockIcon className="w-5 h-5 text-blue-600"/>

          <div>
            <p className="text-xs text-gray-500 uppercase">
              Previsão de término
            </p>

            <p className="font-semibold dark:text-white">
              {dataFim || "Não informado"}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 flex gap-3 items-center">
          <ClockIcon className="w-5 h-5 text-blue-600"/>

          <div>
            <p className="text-xs text-gray-500 uppercase">
              Carga horária
            </p>

            <p className="font-semibold dark:text-white">
              {estagio.carga_horaria || "Não informado"}
            </p>
          </div>
        </div>

      </div>

      <hr className="my-6 border-gray-200 dark:border-slate-700" />

      <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Descrição
        </h2>

        <p className="text-gray-600 dark:text-slate-300 leading-8 whitespace-pre-line">
          {estagio.descricao || "Nenhuma descrição cadastrada."}
        </p>
      </div>
      <hr className="my-6 border-gray-200 dark:border-slate-700" />

      <div>
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Documentos
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-5 flex justify-between items-center">
            <div>
              <h3 className="font-semibold dark:text-white">
                Termo de Compromisso
              </h3>

              <p className="text-sm text-gray-500">
                Documento obrigatório
              </p>
            </div>

            <button
              onClick={() => visualizarDocumento("termo_de_compromisso")}
              className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Visualizar
            </button>
          </div>

        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-5 flex justify-between items-center">
          <div>
            <h3 className="font-semibold dark:text-white">
              Termo de Orientação
            </h3>

            <p className="text-sm text-gray-500">
              Documento obrigatório
            </p>
          </div>

          <button
            onClick={() => visualizarDocumento("termo_de_orientacao")}
            className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Visualizar
          </button>
        </div>

      </div>
    </div>
  </div>
  </div>
);};