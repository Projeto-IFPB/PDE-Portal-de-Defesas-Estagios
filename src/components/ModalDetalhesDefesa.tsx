'use client'

import { X } from "lucide-react";

interface ModalDetalhesDefesaProps {
  isOpen: boolean;
  onClose: () => void;
  local: string;
  banca: any;
}

export default function ModalDetalhesDefesa({ isOpen, onClose, local, banca }: ModalDetalhesDefesaProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-[#004bb5]">Detalhes da Defesa</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <hr className="border-t border-gray-200 mb-4" />
        <p className="text-gray-700 mb-4"><strong>Local:</strong> {local}</p>
        <p className="text-gray-700 mb-2 font-semibold">Banca Examinadora:</p>
        {Array.isArray(banca) && banca.length > 0 ? (
          <ul className="list-disc list-inside mb-4 space-y-1">
            {banca.map((membro: any, index: number) => (
              <li key={index} className="text-gray-700">
                {membro.nome}{membro.email ? ` - ${membro.email}` : ''}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mb-4">Nenhum membro cadastrado</p>
        )}
        <button onClick={onClose} className="px-4 py-2 bg-[#0052cc] text-white rounded-lg text-sm">Fechar</button>
      </div>
    </div>
  );
}
