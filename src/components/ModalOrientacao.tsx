import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";
import {
  agendarDefesa,
  uploadESalvarDocumento,
} from "@/lib/supabase/functions-insert";

interface ModalOrientacaoProps {
  isOpen: boolean;
  onClose: () => void;
  estagioId: string; // <-- Recebendo o ID
}

export default function ModalOrientacao({
  isOpen,
  onClose,
  estagioId,
}: ModalOrientacaoProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Estados do formulário
  const [dataDefesa, setDataDefesa] = useState("");
  const [localDefesa, setLocalDefesa] = useState("");
  const [banca, setBanca] = useState([{ nome: "", email: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    tipo: "sucesso" | "erro";
    mensagem: string;
  } | null>(null);
  const [ataFile, setAtaFile] = useState<File | null>(null);
  const [relatorioFile, setRelatorioFile] = useState<File | null>(null);

  // Função para resetar o formulário
  const resetarFormulario = () => {
    setDataDefesa("");
    setLocalDefesa("");
    setBanca([{ nome: "", email: "" }]);
    setAtaFile(null);
    setRelatorioFile(null);
  };

  const fecharModal = () => {
    if (isSubmitting) return;
    onClose();
    resetarFormulario();
  };

  // Função para atualizar um membro específico da banca
  const handleBancaChange = (
    index: number,
    campo: "nome" | "email",
    valor: string
  ) => {
    const novaBanca = [...banca];
    novaBanca[index][campo] = valor;
    setBanca(novaBanca);
  };

  const handleConfirmarAgendamento = async () => {
    if (!dataDefesa || !localDefesa || banca.some((m) => !m.nome || !m.email)) {
      setFeedback({
        tipo: "erro",
        mensagem: "Por favor, preencha todos os campos obrigatórios.",
      });
      setTimeout(() => setFeedback(null), 3000);
      return;
    }

    try {
      setIsSubmitting(true);

      await agendarDefesa({
        id_estagio: estagioId,
        data_defesa: dataDefesa,
        local_defesa: localDefesa,
        banca_examinadora: banca,
        status: "agendado",
      });
      if (ataFile) {
        await uploadESalvarDocumento(ataFile, estagioId, "ata_defesa");
      }
      if (relatorioFile) {
        await uploadESalvarDocumento(
          relatorioFile,
          estagioId,
          "relatorio_final"
        );
      }

      setFeedback({
        tipo: "sucesso",
        mensagem: "Defesa agendada com sucesso!",
      });
      setTimeout(() => {
        setFeedback(null);
        fecharModal();
      }, 2000);
    } catch (error) {
      console.error("Erro ao agendar:", error);
      setFeedback({
        tipo: "erro",
        mensagem: "Ocorreu um erro ao agendar. Tente novamente.",
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
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ${window.screen.width <= 768 ? `flex-col` : ""}`}
    >
      {feedback && (
        <div
          className={`fixed top-6 right-6 z-[60] px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-top-5
            ${
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
        className={`bg-white rounded-xl shadow-xl w-full max-w-3xl flex flex-col ${banca.length >= 2 || window.screen.width <= 768 ? "max-h-[90vh] overflow-y-auto" : "overflow-visible"}`}
      >
        <div className="p-8 pb-4">
          <div className="flex mb-1 justify-between items-start">
            <h2 className="text-2xl font-bold text-[#004bb5]">
              Agendar Defesa de Estágio
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
            Preencha os detalhes para formalizar o evento acadêmico.
          </p>
          <hr className="border-t border-gray-200 mb-5" />

          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-green-700" />
            <h3 className="text-sm font-bold text-green-700 tracking-wide">
              INFORMAÇÕES DO EVENTO
            </h3>
          </div>

          <div
            className={` gap-6 mb-8 ${window.screen.width < 768 ? `flex flex-col` : "grid grid-cols-2"}`}
          >
            <div className="flex flex-col">
              <label
                htmlFor="datadefesa"
                className="text-sm font-medium text-gray-800 mb-1.5"
              >
                Data da Defesa
              </label>
              <input
                type="date"
                id="datadefesa"
                value={dataDefesa}
                onChange={(e) => setDataDefesa(e.target.value)}
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
                  id="localdefesa"
                  value={localDefesa}
                  onChange={(e) => setLocalDefesa(e.target.value)}
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

          {banca.map((membro, index) => (
            <div
              key={index}
              className={` gap-6 mb-3 ${window.screen.width < 768 ? `flex flex-col bg-gray-200 rounded-lg p-6` : "grid grid-cols-2"}`}
            >
              <div className="flex flex-col">
                <label
                  className={`text-sm font-medium  mb-1.5 ${window.screen.width < 768 ? "text-[#004bb5]" : "text-gray-800"}`}
                >
                  Nome do Integrante
                </label>
                <input
                  type="text"
                  placeholder="Nome Completo"
                  value={membro.nome}
                  onChange={(e) =>
                    handleBancaChange(index, "nome", e.target.value)
                  }
                  className={`w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${window.screen.width < 768 ? "bg-white border-gray-400" : "border-gray-300"}`}
                />
              </div>
              <div className="flex flex-col">
                <label
                  className={`text-sm font-medium mb-1.5 ${window.screen.width < 768 ? "text-[#004bb5]" : "text-gray-800"}`}
                >
                  E-mail Institucional
                </label>
                <input
                  type="email"
                  placeholder="nome@instituicao.edu"
                  value={membro.email}
                  onChange={(e) =>
                    handleBancaChange(index, "email", e.target.value)
                  }
                  className={`w-full border  rounded-md p-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${window.screen.width < 768 ? "bg-white border-gray-400" : "border-gray-300"}`}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setBanca([...banca, { nome: "", email: "" }])}
            className="flex items-center gap-2 text-[#004bb5] text-sm font-medium hover:text-blue-800 mb-8 transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> Adicionar Integrante
          </button>

          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-green-700" />
            <h3 className="text-sm font-bold text-green-700 tracking-wide">
              DOCUMENTAÇÃO
            </h3>
          </div>

          <div className={` gap-6 mb-8 ${window.screen.width < 768 ? `flex flex-col bg-gray-200 rounded-lg p-6` : "grid grid-cols-2"}`}>
            <div>
              <div className="flex justify-between items-end mb-1.5">
                <span className="text-sm font-medium text-gray-800">
                  Ata de Defesa
                </span>
                <button className="flex items-center gap-1 text-[#004bb5] text-xs font-semibold hover:underline">
                  <Download className="w-3.5 h-3.5" /> Baixar Modelo
                </button>
              </div>
              <label className={`border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group ${window.screen.width < 768 ? "bg-gray-200":"bg-white"}`}>
                <FileUp className="w-6 h-6 text-[#004bb5] mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-gray-800 text-center">
                  {ataFile ? ataFile.name : "Arraste ou clique"}
                </span>
                {!ataFile && (
                  <span className="text-xs text-gray-500 font-medium uppercase mt-0.5">
                    PDF até 5MB
                  </span>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) => setAtaFile(e.target.files?.[0] || null)}
                />
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
              <label className={`border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors  group ${window.screen.width < 768 ? "bg-gray-200":"bg-white"}`}>
                <CloudUpload className="w-6 h-6 text-[#004bb5] mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-gray-800 text-center">
                  {relatorioFile ? relatorioFile.name : "Arraste ou clique"}
                </span>
                {!relatorioFile && (
                  <span className="text-xs text-gray-500 font-medium uppercase mt-0.5">
                    PDF até 15MB
                  </span>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) =>
                    setRelatorioFile(e.target.files?.[0] || null)
                  }
                />
              </label>
            </div>
          </div>
        </div>

        <div className={`bg-gray-50/80 px-8 py-5 border-t border-gray-100 flex  items-center gap-6 ${window.screen.width <= 768 ? `flex-col` : "justify-end"}`}>
          <button
            onClick={fecharModal}
            disabled={isSubmitting}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmarAgendamento}
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-[#0052cc] hover:bg-[#0043a6] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Agendando..." : "Confirmar Agendamento"}
            {!isSubmitting && <CheckCircle className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
