'use client';

import CabecalhoBoasVindas from "@/components/CabecalhoBoasVindas";
import CardInformativo from "@/components/CardInformativo";
import { cardsAluno, cardsOrientador, cardsCoordenador } from "@/data/cards-dashboard";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { usuario, setUsuario } = useAuth();

  const configPorPerfil = {
    aluno: {
      titulo: "Bem-vindo, Estudante",
      subtitulo: "Gerencie seus estágios e acompanhe seu progresso.",
      cards: cardsAluno,
    },
    orientador: {
      titulo: "Bem-vindo, Professor",
      subtitulo: "Gerencie seus orientandos e acompanhe o progresso acadêmico.",
      cards: cardsOrientador,
    },
    coordenador: {
      titulo: "Bem-vindo, Coordenador",
      subtitulo: "Gerencie o curso e acompanhe o progresso acadêmico.",
      cards: cardsCoordenador,
    },
  };

  const { titulo, subtitulo, cards } = configPorPerfil[usuario.perfil];

  const gridColunasDesktop = cards.length >= 4 
    ? 'lg:grid-cols-2 xl:grid-cols-4' 
    : 'lg:grid-cols-3';

  return (
    <main className="col-span-1 p-4 md:p-8 lg:col-span-4 lg:p-10">
      
      {/* Botões provisórios para troca de perfil */}
      <div className="mb-8 flex gap-2 rounded-lg bg-white p-2 shadow-sm w-fit border border-gray-200">
         <button onClick={() => setUsuario({ ...usuario, perfil: 'aluno' })} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${usuario.perfil === 'aluno' ? 'bg-[#185adb] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>Aluno</button>
         <button onClick={() => setUsuario({ ...usuario, perfil: 'orientador' })} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${usuario.perfil === 'orientador' ? 'bg-[#185adb] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>Orientador</button>
         <button onClick={() => setUsuario({ ...usuario, perfil: 'coordenador' })} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${usuario.perfil === 'coordenador' ? 'bg-[#185adb] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>Coordenador</button>
      </div>

      <CabecalhoBoasVindas 
        titulo={titulo}
        subtitulo={subtitulo}
      />

      <section className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${gridColunasDesktop} lg:gap-6`}>
        {cards.map((card, index) => (
          <CardInformativo
            key={index}
            titulo={card.titulo}
            valor={card.valor}
            subtitulo={card.subtitulo}
            icone={card.icone}
            variante={card.variante}
          />
        ))}
      </section>

    </main>
  );
}