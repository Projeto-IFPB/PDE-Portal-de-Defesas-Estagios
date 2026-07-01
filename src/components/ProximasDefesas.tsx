import React from 'react';

// Tipagem para os dados que o componente vai receber
interface DefesaItem {
  id: string;
  dataDefesa: string; // Formato vindo do banco: 'YYYY-MM-DD'
  horario: string;    // Formato: 'HH:MM'
  local: string;      // Ex: 'Auditório B' ou 'Virtual'
  alunoNome: string;
}

interface ProximasDefesasProps {
  defesas: DefesaItem[];
}

export default function ProximasDefesas({ defesas }: ProximasDefesasProps) {
  
  // Função auxiliar para quebrar a data em Dia e Mês Abreviado
  const formatarDataBadge = (dataStr: string) => {
    // Adicionamos o T00:00:00 para evitar problemas de fuso horário local mudando o dia
    const data = new Date(`${dataStr}T00:00:00`);
    const dia = data.getDate().toString().padStart(2, '0');
    
    const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const mes = meses[data.getMonth()];
    
    return { dia, mes };
  };

  if (!defesas || defesas.length === 0) {
    return (
      <div className="bg-[#FAFBFD] border border-gray-100 rounded-2xl p-6 shadow-sm w-full">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Próximas Defesas</h2>
        <p className="text-sm text-gray-500">Nenhuma defesa agendada para os próximos dias.</p>
      </div>
    );
  }

  return (
    // Box principal com fundo cinza bem clarinho/esbranquiçado e bordas arredondadas
    <div className="bg-[#FAFBFD] border border-gray-100 rounded-2xl p-6 shadow-sm w-full">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Próximas Defesas</h2>
      
      {/* CONTAINER RESPONSIVO:
        - No Mobile: flex-col (fica um abaixo do outro)
        - No Desktop (md): flex-row (fica um ao lado do outro)
      */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {defesas.map((defesa, index) => {
          const { dia, mes } = formatarDataBadge(defesa.dataDefesa);
          const isFirst = index === 0; // Verifica se é o mais próximo

          return (
            <div 
              key={defesa.id} 
              className="flex items-center gap-4 bg-[#F1F3F5] p-4 rounded-xl flex-1 border border-gray-200/50 
              min-w-[240px]"
            >
              {/* Badge da Data */}
              <div 
                className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl font-bold transition-colors ${
                  isFirst 
                    ? 'bg-blue-600 text-white' // O primeiro/mais próximo fica Azul
                    : 'bg-[#E9ECEF] text-[#6C757D]' // Os outros ficam branco meio cinza
                }`}
              >
                <span className="text-[10px] tracking-wider font-semibold leading-none">{mes}</span>
                <span className="text-xl font-extrabold leading-none mt-1">{dia}</span>
              </div>

              {/* Informações da Defesa */}
              <div className="flex flex-col">
                <span className="font-bold text-gray-800 text-sm md:text-base">
                  {defesa.alunoNome}
                </span>
                <span className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  {/* Se o local for virtual, dá pra customizar ou manter o texto simples como no protótipo */}
                  {defesa.local} - {defesa.horario}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}