import React from 'react';
import { LucideIcon } from 'lucide-react';

export type VarianteCard = 'azul' | 'verde' | 'laranja' | 'roxo';

interface PropsCardInformativo {
  titulo: string;
  valor: React.ReactNode;
  subtitulo?: string;
  icone: LucideIcon;
  variante: VarianteCard;
}

const estilosVariante: Record<VarianteCard, string> = {
  azul: 'bg-[#185adb] text-white',           
  laranja: 'bg-[#b86b00] text-white',
  verde: 'bg-[#0f7642] text-white',   
  roxo: 'bg-[#89389c] text-white',      
};

export default function CardInformativo({
  titulo,
  valor,
  subtitulo,
  icone: Icone,
  variante,
}: PropsCardInformativo) {
  return (
    <article
      className={`relative flex min-h-35 flex-col justify-between overflow-hidden rounded-2xl p-5 shadow-sm transition hover:shadow-md md:p-6 ${estilosVariante[variante]}`}
    >
      <div className="relative z-10 w-full overflow-hidden">
        <h3 className="text-sm font-medium tracking-wide md:text-base truncate">
          {titulo}
        </h3>
        
        <div className="mt-2 flex flex-col items-start w-full">
          <p className="text-4xl font-extrabold tracking-tight md:text-5xl truncate w-full">
            {valor}
          </p>
          
          {subtitulo && (
            <span className="mt-4 inline-flex max-w-full items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium backdrop-blur-md whitespace-nowrap truncate">
              {subtitulo}
            </span>
          )}
        </div>
      </div>

      <Icone 
        className="absolute -bottom-6 -right-6 h-36 w-36 opacity-[0.15]" 
        aria-hidden="true" 
      />
    </article>
  );
}