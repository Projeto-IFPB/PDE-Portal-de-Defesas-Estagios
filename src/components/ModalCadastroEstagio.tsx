import { useEffect, useRef, useState } from "react";
import {
  X,
  Calendar,
  Building,
  GraduationCap,
  FileText,
  Download,
  FileUp,
  CloudUpload,
  CheckCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase/supabaseClient";

interface ModalCadastroEstagioProps {
  isOpen: boolean;
  onClose: () => void;
  Id_usuario: string;
}

interface UsuarioSugestao {
  Nome_Completo: string;
  tipo_de_perfil: string;
}

export default function ModalEstagio({
  isOpen,
  onClose,
  Id_usuario,
}: ModalCadastroEstagioProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [empresa, setEmpresa] = useState("");
  const [curso, setCurso] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [orientador, setOrientador] = useState("");
  const [coordenador, setCoordenador] = useState("");
  const [descricao, setDescricao] = useState("");

  const [usuariosSugestoes, setUsuariosSugestoes] = useState<UsuarioSugestao[]>(
    []
  );
  const [cursosSugestoes, setCursosSugestoes] = useState<string[]>([]);

  const [termoCompromisso, setTermoCompromisso] = useState<File | null>(null);
  const [termoOrientacao, setTermoOrientacao] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    tipo: "sucesso" | "erro";
    mensagem: string;
  } | null>(null);

  useEffect(() => {
    async function carregarSugestoes() {
      try {
        // 1. Busca os Usuários (Orientadores e Coordenadores)
        const { data: dataUsuarios, error: errorUsuarios } = await supabase
          .from("Usuarios")
          .select("Nome_Completo, tipo_de_perfil");

        if (errorUsuarios) throw errorUsuarios;
        if (dataUsuarios) setUsuariosSugestoes(dataUsuarios);

        const { data: dataEstagios, error: errorEstagios } = await supabase
          .from("Estagios")
          .select("curso");

        if (errorEstagios) throw errorEstagios;

        if (dataEstagios) {
          const cursosUnicos = Array.from(
            new Set(dataEstagios.map((item) => item.curso).filter(Boolean))
          );
          setCursosSugestoes(cursosUnicos);
        }
      } catch (error) {
        console.error("Erro ao carregar sugestões do Supabase:", error);
      }
    }

    if (isOpen) {
      carregarSugestoes();
    }
  }, [isOpen]);

  const orientadoresFiltrados = usuariosSugestoes.filter(
    (user) =>
      user.tipo_de_perfil === "orientador" ||
      user.tipo_de_perfil === "coordenador"
  );

  const coordenadoresFiltrados = usuariosSugestoes.filter(
    (user) => user.tipo_de_perfil === "coordenador"
  );

  const resetarFormulario = () => {
    setEmpresa("");
    setDataFim("");
    setCurso("");
    setOrientador("");
    setCoordenador("");
    setDescricao("");
    setCargaHoraria("");
    setTermoCompromisso(null);
    setTermoOrientacao(null);
  };

  const fecharModal = () => {
    if (isSubmitting) return;
    onClose();
    resetarFormulario();
  };

  const handleCadastrarEstagio = async () => {
    if (
      !empresa ||
      !cargaHoraria ||
      !dataFim ||
      !curso ||
      !orientador ||
      !coordenador ||
      !descricao
    ) {
      setFeedback({
        tipo: "erro",
        mensagem: "Por favor, preencha todos os campos obrigatórios.",
      });
      setTimeout(() => setFeedback(null), 3000);
      return;
    }

    try {
      setIsSubmitting(true);
      setFeedback({
        tipo: "sucesso",
        mensagem: "Estágio cadastrado com sucesso!",
      });
      setTimeout(() => {
        setFeedback(null);
        fecharModal();
      }, 2000);
    } catch (error) {
      console.error("Erro ao cadastrar estágio:", error);
      setFeedback({
        tipo: "erro",
        mensagem: "Ocorreu um erro ao cadastrar. Tente novamente.",
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
          className={`fixed top-6 right-6 z-60 px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-top-5
            ${feedback.tipo === "sucesso" ? "bg-[#d1fae5] text-[#064e3b]" : "bg-red-100 text-red-800"}`}
        >
          {feedback.mensagem}
        </div>
      )}

      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]"
      >
        <div className="p-8 pb-4 overflow-y-auto flex-1 min-h-0">
          <div className="flex mb-1 justify-between items-start">
            <h2 className="text-2xl font-bold text-[#004bb5]">
              Cadastrar Novo Estágio
            </h2>
            <button
              onClick={fecharModal}
              disabled={isSubmitting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-5">
            Preencha as informações necessárias para iniciar o seu processo de
            estágio.
          </p>
          <hr className="border-t border-gray-200 mb-5" />

          <div className="flex items-center gap-2 mb-4">
            <Building className="w-5 h-5 text-green-700" />
            <h3 className="text-sm font-bold text-green-700 tracking-wide">
              INFORMAÇÕES DO ESTÁGIO
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label
                htmlFor="empresa"
                className="text-sm font-medium text-gray-800 mb-1.5"
              >
                Empresa Empregadora
              </label>
              <input
                type="text"
                id="empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Nome da empresa ou CNPJ"
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 placeholder:text-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="curso"
                className="text-sm font-medium text-gray-800 mb-1.5"
              >
                Curso Estagiario
              </label>
              <div className="relative flex items-center">
                <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3" />
                <input
                  type="text"
                  id="curso"
                  list="lista-cursos"
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  placeholder="Engenharia de Software"
                  className="w-full border border-gray-300 rounded-md py-2.5 pr-2.5 pl-9 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 placeholder:text-gray-400"
                />
                <datalist id="lista-cursos">
                  {cursosSugestoes.map((nomeCurso, idx) => (
                    <option key={idx} value={nomeCurso} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label
                htmlFor="dataInicio"
                className="text-sm font-medium text-gray-800 mb-1.5"
              >
                Data de Enceramento(Previsão)
              </label>
              <div className="relative flex items-center">
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3" />
                <input
                  type="date"
                  id="dataInicio"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2.5 pr-2.5 pl-9 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="cargaHoraria"
                className="text-sm font-medium text-gray-800 mb-1.5"
              >
                Carga Horaria Semanal
              </label>
              <div className="relative flex items-center">
                <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3" />
                <input
                  type="number"
                  id="cargaHoraria"
                  value={cargaHoraria}
                  onChange={(e) => setCargaHoraria(e.target.value)}
                  placeholder="30h"
                  className="w-full border border-gray-300 rounded-md py-2.5 pr-2.5 pl-9 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label
                htmlFor="orientador"
                className="text-sm font-medium text-gray-800 mb-1.5"
              >
                Nome do Orientador
              </label>
              <div className="relative flex items-center">
                <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3" />
                <input
                  type="text"
                  id="orientador"
                  list="lista-orientadores"
                  value={orientador}
                  onChange={(e) => setOrientador(e.target.value)}
                  placeholder="Orientador acadêmico"
                  className="w-full border border-gray-300 rounded-md py-2.5 pr-2.5 pl-9 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 placeholder:text-gray-400"
                />
                <datalist id="lista-orientadores">
                  {orientadoresFiltrados.map((user, idx) => (
                    <option key={idx} value={user.Nome_Completo} />
                  ))}
                </datalist>
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="coordenador"
                className="text-sm font-medium text-gray-800 mb-1.5"
              >
                Nome do Coordenador
              </label>
              <div className="relative flex items-center">
                <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3" />
                <input
                  type="text"
                  id="coordenador"
                  list="lista-coordenadores"
                  value={coordenador}
                  onChange={(e) => setCoordenador(e.target.value)}
                  placeholder="Coordenador acadêmico"
                  className="w-full border border-gray-300 rounded-md py-2.5 pr-2.5 pl-9 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 placeholder:text-gray-400"
                />
                <datalist id="lista-coordenadores">
                  {coordenadoresFiltrados.map((user, idx) => (
                    <option key={idx} value={user.Nome_Completo} />
                  ))}
                </datalist>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="flex flex-col">
              <label
                htmlFor="descricao"
                className="text-sm font-medium text-gray-800 mb-1.5"
              >
                Breve descrição do Estágio
              </label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Resuma as principais atividades e objetivos..."
                rows={4}
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-700 placeholder:text-gray-400 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-green-700" />
            <h3 className="text-sm font-bold text-green-700 tracking-wide">
              DOCUMENTAÇÃO OBRIGATÓRIA
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-sm font-medium text-gray-800">
                  Termo de Compromisso
                </span>
                <button className="flex items-center gap-1 text-[#004bb5] text-xs font-semibold hover:underline">
                  <Download className="w-3.5 h-3.5" /> Baixar Modelo
                </button>
              </div>
              <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group bg-white">
                <FileUp className="w-6 h-6 text-[#004bb5] mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-gray-800 text-center max-w-[200px] truncate">
                  {termoCompromisso
                    ? termoCompromisso.name
                    : "Arraste ou clique"}
                </span>
                {!termoCompromisso && (
                  <span className="text-xs text-gray-500 font-medium uppercase mt-0.5">
                    PDF até 5MB
                  </span>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) =>
                    setTermoCompromisso(e.target.files?.[0] || null)
                  }
                />
              </label>
            </div>

            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-sm font-medium text-gray-800">
                  Termo de Orientação
                </span>
                <button className="flex items-center gap-1 text-[#004bb5] text-xs font-semibold hover:underline">
                  <Download className="w-3.5 h-3.5" /> Baixar Modelo
                </button>
              </div>
              <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group bg-white">
                <CloudUpload className="w-6 h-6 text-[#004bb5] mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-gray-800 text-center max-w-[200px] truncate">
                  {termoOrientacao ? termoOrientacao.name : "Arraste ou clique"}
                </span>
                {!termoOrientacao && (
                  <span className="text-xs text-gray-500 font-medium uppercase mt-0.5">
                    DOCX até 15MB
                  </span>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept=".docx,.doc,.pdf"
                  onChange={(e) =>
                    setTermoOrientacao(e.target.files?.[0] || null)
                  }
                />
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-50/80 px-8 py-5 border-t border-gray-100 flex items-center justify-end gap-6">
          <button
            onClick={fecharModal}
            disabled={isSubmitting}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleCadastrarEstagio}
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-[#0052cc] hover:bg-[#0043a6] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar Estágio"}
            {!isSubmitting && <CheckCircle className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
