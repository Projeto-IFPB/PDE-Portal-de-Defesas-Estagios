import React, { useEffect, useRef, useState } from 'react';
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

interface ModalOrientacaoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalOrientacao({ isOpen, onClose }: ModalOrientacaoProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [banca, setBanca] = useState([{ id: Date.now(), nome: "", email: "" }]);

  // Função para resetar o formulário
  const resetarFormulario = () => {
    setBanca([{ id: Date.now(), nome: "", email: "" }]);
  };

  // Função para fechar o modal e resetar
  const fecharModal = () => {
    onClose();
    resetarFormulario();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={modalRef}
        className={`bg-white rounded-xl shadow-xl w-full max-w-3xl flex flex-col ${banca.length >= 2 ? "max-h-[90vh] overflow-y-auto" : "overflow-visible"}`}
      >
        <div className="p-8 pb-4">
          <div className="flex mb-1 justify-between items-start">
            <h2 className="text-2xl font-bold text-[#004bb5]">
              Agendar Defesa de Estágio
            </h2>
            <button
              onClick={fecharModal}
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

          {banca.map((membro, index) => (
            <div key={membro.id} className="grid grid-cols-2 gap-6 mb-3">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800 mb-1.5">Nome do Integrante</label>
                <input type="text" placeholder="Nome Completo" className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none" />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800 mb-1.5">E-mail Institucional</label>
                <input type="email" placeholder="nome@instituicao.edu" className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none" />
              </div>
            </div>
          ))}

          <button type="button" onClick={() => setBanca([...banca, { id: Date.now(), nome: "", email: "" }])} className="flex items-center gap-2 text-[#004bb5] text-sm font-medium hover:text-blue-800 mb-8 transition-colors">
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
            onClick={fecharModal}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={fecharModal}
            className="px-5 py-2.5 bg-[#0052cc] hover:bg-[#0043a6] text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            Confirmar Agendamento
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}