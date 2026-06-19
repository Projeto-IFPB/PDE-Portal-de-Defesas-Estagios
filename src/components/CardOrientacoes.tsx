'use client';

import React from 'react';

 export const handleVerDetalhes = (id: string) => {
    console.log('Visualizando estágio ID:', id);
  };
// Tipagem alinhada com o que você provavelmente tem no banco de dados
export type StatusEstagio = 'pendente' | 'em_andamento' | 'concluido';

interface EstagioCardProps {
  id: string;
  empresa: string;
  data: string;
  status: StatusEstagio;
  onVerDetalhes?: (id: string) => void;
}

// Configuração visual dinâmica baseada no status do estágio
const statusConfig: Record<StatusEstagio, { label: string; colorClasses: string }> = {
  pendente: { 
    label: 'Pendente', 
    colorClasses: 'bg-yellow-100 text-yellow-800 border-yellow-200' 
  },
  em_andamento: { 
    label: 'Em Andamento', 
    colorClasses: 'bg-green-100 text-green-800 border-green-200' 
  },
  concluido: { 
    label: 'Concluído', 
    colorClasses: 'bg-gray-100 text-gray-800 border-gray-200' 
  },
};

export default function EstagioCard({ id, empresa, data, status, onVerDetalhes }: EstagioCardProps) {
  const currentStatus = statusConfig[status];

  return (
    <div className="flex flex-col justify-between p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div>
        <div className='flex justify-between'>
        <div >
            <p>foto</p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-1" title={empresa}>
            {empresa}
          </h3>
          <p>email</p>
        </div>
        <div>
          <span className={`px-2.5 py-1 text-xs font-medium border rounded-full ${currentStatus.colorClasses}`}>
            {currentStatus.label}
          </span>
        </div>
        </div>
        <hr />
        <div>
        <p className="text-sm text-gray-600 mb-6 line-clamp-2">
          {empresa}
        </p>
        <p className="text-sm text-gray-600 mb-6 line-clamp-2">
          {data}
        </p>
        </div>
      </div>
      <hr />
        <div className='flex justify-between'>
      <button
        onClick={() => onVerDetalhes && onVerDetalhes(id)}
        className="py-2 px-4 bg-blue-100 hover:bg-blue-700 text-blue-800 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Ver Detalhes
      </button>
      <button>
        agendar defesa
      </button>
      </div>
    </div>
  );
}