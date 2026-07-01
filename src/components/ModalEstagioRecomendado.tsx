"use client";

import { useEffect, useRef, useState } from "react";
import { X, Building, CheckCircle } from "lucide-react";
import { cadastrarEstagioRecomendado } from "@/lib/supabase/functions-insert";

interface ModalCadastroEstagioRecomendadoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalEstagioRecomendado({
  isOpen,
  onClose,
  onSuccess,
}: ModalCadastroEstagioRecomendadoProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [empresa, setEmpresa] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [competencias, setCompetencias] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    tipo: "sucesso" | "erro";
    mensagem: string;
  } | null>(null);

  const resetarFormulario = () => {
    setEmpresa("");
    setTitulo("");
    setCompetencias("");
    setDescricao("");
  };

  const fecharModal = () => {
    if (isSubmitting) return;
    onClose();
    resetarFormulario();
  };

  const handleCadastrarEstagioRecomendado = async () => {
    if (!empresa || !titulo || !competencias || !descricao) {
      setFeedback({
        tipo: "erro",
        mensagem: "Por favor, preencha todos os campos obrigatórios.",
      });
      setTimeout(() => setFeedback(null), 3000);
      return;
    }

    try {
      setIsSubmitting(true);

      await cadastrarEstagioRecomendado({
        titulo: titulo,
        empresa: empresa,
        competencia: competencias,
        descricao: descricao,
      });

      setFeedback({
        tipo: "sucesso",
        mensagem: "Estágio e documentos cadastrados com sucesso!",
      });

      setTimeout(() => {
        setFeedback(null);
        fecharModal();
        onSuccess();
      }, 2000);
    } catch (error: any) {
      console.error("❌ Erro ao cadastrar estágio:", error);
      setFeedback({
        tipo: "erro",
        mensagem:
          error.message || "Ocorreu um erro ao cadastrar. Tente novamente.",
      });
      setTimeout(() => setFeedback(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        fecharModal();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {feedback && (
        <div
          className={`fixed top-6 right-6 z-60 px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-top-5 ${
            feedback.tipo === "sucesso"
              ? "bg-[#d1fae5] text-[#064e3b]"
              : "bg-red-100 text-red-800"
          }`}
        >
          {feedback.mensagem}
        </div>
      )}

      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh] dark:bg-slate-900"
      >
        <div className="p-8 pb-6 overflow-y-auto flex-1 min-h-0">
          <div className="flex mb-1 justify-between items-start">
            <h2 className="text-xl font-bold text-[#0052cc] dark:text-[#004bb1]">
              Nova Recomendação de Estágio
            </h2>
            <button
              onClick={fecharModal}
              disabled={isSubmitting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 dark:text-slate-400 dark:hover:text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6 dark:text-slate-400">
            Preencha os detalhes para publicar a vaga no portal do aluno.
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label
                htmlFor="titulo"
                className="text-sm font-medium text-gray-800 mb-1.5 dark:text-slate-400"
              >
                Título da Vaga
              </label>
              <input
                type="text"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Desenvolvedor Front-end Estagiário"
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="empresa"
                className="text-sm font-medium text-gray-800 mb-1.5 dark:text-slate-400"
              >
                Empresa
              </label>
              <div className="relative flex items-center">
                <Building className="w-4 h-4 text-gray-500 absolute left-3" />
                <input
                  type="text"
                  id="empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Nome da empresa parceira"
                  className="w-full border border-gray-300 rounded-md py-2.5 pr-2.5 pl-9 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="descricao"
                className="text-sm font-medium text-gray-800 mb-1.5 dark:text-slate-400"
              >
                Descrição
              </label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descreva as responsabilidades e o ambiente de trabalho..."
                rows={4}
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 dark:text-slate-100 placeholder:text-gray-400 resize-none dark:placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="competencias"
                className="text-sm font-medium text-gray-800 mb-1.5 dark:text-slate-400"
              >
                Competências
              </label>
              <input
                type="text"
                id="competencias"
                value={competencias}
                onChange={(e) => setCompetencias(e.target.value)}
                placeholder="Ex: React, Tailwind CSS, Trabalho em equipe (separadas por vírgula)"
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50/80 px-8 py-4 border-t border-gray-100 flex items-center justify-end gap-4 dark:bg-slate-900/50 dark:border-slate-800">
          <button
            onClick={fecharModal}
            disabled={isSubmitting}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleCadastrarEstagioRecomendado}
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-[#0052cc] hover:bg-[#0043a6] text-white rounded-md text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Publicando..." : "Publicar Vaga"}
            {!isSubmitting && <CheckCircle className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
