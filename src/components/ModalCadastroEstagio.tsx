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

interface ModalCadastroEstagioProps {
  isOpen: boolean;
  onClose: () => void;
  Id_usuario: string;
}

export default function ModalEstagio({
  isOpen,
  onClose,
  Id_usuario,
}: ModalCadastroEstagioProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Estados do formulário
  const [empresa, setEmpresa] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [orientador, setOrientador] = useState("");
  const [descricao, setDescricao] = useState("");
  
  // Estados de arquivos
  const [termoCompromisso, setTermoCompromisso] = useState<File | null>(null);
  const [termoOrientacao, setTermoOrientacao] = useState<File | null>(null);

  // Estados de controle e feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    tipo: "sucesso" | "erro";
    mensagem: string;
  } | null>(null);

  // Função para resetar o formulário
  const resetarFormulario = () => {
    setEmpresa("");
    setDataInicio("");
    setOrientador("");
    setDescricao("");
    setTermoCompromisso(null);
    setTermoOrientacao(null);
  };

  const fecharModal = () => {
    if (isSubmitting) return;
    onClose();
    resetarFormulario();
  };

  const handleCadastrarEstagio = async () => {
    if (!empresa || !dataInicio || !orientador || !descricao) {
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
            ${feedback.tipo === 'sucesso' 
              ? 'bg-[#d1fae5] text-[#064e3b]'
              : 'bg-red-100 text-red-800'     
            }`}
        >
          {feedback.mensagem}
        </div>
      )}

      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]"
      >
        <div className="p-8 pb-4 overflow-y-auto flex-1 min-h-0">
          
          <div >
            <h2 >
              Cadastrar Novo Estágio
            </h2>
            <button
              onClick={fecharModal}
              disabled={isSubmitting}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <p>
            Preencha as informações necessárias para iniciar o seu processo de estágio.
          </p>
          <hr/>
          <div>
            <Building className="w-5 h-5 text-green-700" />
            <h3>
              INFORMAÇÕES DO ESTÁGIO
            </h3>
          </div>

          <div>
            <div>
              <label htmlFor="empresa">
                Empresa Empregadora
              </label>
              <input
                type="text"
                id="empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Nome da empresa ou CNPJ"/>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="dataInicio">
                Data de Início
              </label>
              <div>
                <Calendar className="w-4 h-4 text-gray-400 absolute left-3" />
                <input
                  type="date"
                  id="dataInicio"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}/>
              </div>
            </div>

            <div>
              <label htmlFor="orientador">
                Nome do Orientador
              </label>
              <div>
                <GraduationCap className="w-4 h-4 text-gray-400 absolute left-3" />
                <input
                  type="text"
                  id="orientador"
                  value={orientador}
                  onChange={(e) => setOrientador(e.target.value)}
                  placeholder="Orientador acadêmico"/>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <div className="flex flex-col">
              <label htmlFor="descricao" className="text-sm font-medium text-gray-800 mb-1.5">
                Breve descrição do Estágio
              </label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Resuma as principais atividades e objetivos..."/>
            </div>
          </div>

          <div>
            <FileText className="w-5 h-5 text-green-700" />
            <h3>
              DOCUMENTAÇÃO OBRIGATÓRIA
            </h3>
          </div>

          <div>

            <div>
              <div>
                <span>
                  Termo de Compromisso
                </span>
                <button>
                  <Download className="w-3.5 h-3.5" /> Baixar Modelo
                </button>
              </div>
              <label>
                <FileUp className="w-6 h-6 text-[#004bb5] mb-2 group-hover:scale-110 transition-transform" />
                <span>
                  {termoCompromisso ? termoCompromisso.name : "Arraste ou clique"}
                </span>
                {!termoCompromisso && (
                  <span>
                    PDF até 5MB
                  </span>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={(e) => setTermoCompromisso(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            <div>
              <div>
                <span>
                  Termo de Orientação
                </span>
                <button>
                  <Download className="w-3.5 h-3.5" /> Baixar Modelo
                </button>
              </div>
              <label>
                <CloudUpload className="w-6 h-6 text-[#004bb5] mb-2 group-hover:scale-110 transition-transform" />
                <span>
                  {termoOrientacao ? termoOrientacao.name : "Arraste ou clique"}
                </span>
                {!termoOrientacao && (
                  <span>
                    DOCX até 15MB
                  </span>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept=".docx,.doc,.pdf"
                  onChange={(e) => setTermoOrientacao(e.target.files?.[0] || null)}
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