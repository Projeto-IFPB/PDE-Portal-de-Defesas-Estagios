'use client';

import CabecalhoBoasVindas from "@/components/CabecalhoBoasVindas";
import CardInformativo from "@/components/CardInformativo";
import { cardsAluno, cardsOrientador, cardsCoordenador } from "@/data/cards-dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { listarEstagiosRecomendados } from "@/lib/supabase/functions-supabase";
import { useEffect, useState } from "react";
import { EstagioRecomendado } from "@/lib/supabase/interface";
import { SearchX } from 'lucide-react';

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

  // Puxando os estágios recomendados pela universidade
  const [estagiosDisponiveis, setEstagiosDisponiveis] = useState<EstagioRecomendado[]>([])

  useEffect(() => {
    async function carregarEstagios() {
      const dados = await listarEstagiosRecomendados();
      if (dados) {
        setEstagiosDisponiveis(dados);
      }
    }
    carregarEstagios();
  }, []);



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

      <div className="grid grid-col-1 lg:grid-cols-3 estagios">
        <section className="lg:col-span-2">
          <h1 className="mt-10">Meus Estágios</h1>
        </section>

      <section className={`lg:col-span-1 space-y-3 ${usuario.perfil !== 'aluno' ? 'hidden' : 'mt-10'}`}>
        <h2 className="text-xl font-semibold">Estágios Disponíveis</h2>

        { estagiosDisponiveis.length > 0 ? (
          estagiosDisponiveis.map((estagio) => (
            <div key={estagio.id} className="bg-white p-5 rounded-2xl shadow-sm space-y-1">
              <h2 className="text-xl font-semibold -mb-1">{estagio.titulo}</h2>
              <h4 className="text-slate-600 font-semibold text-[0.9rem]">{estagio.empresa}</h4>

              <div className="flex text-[0.7rem] font-medium text-slate-700 gap-2 mb-5">
                <p className="bg-gray-200 rounded-sm p-1">{estagio.competencia}</p>
                <p className="bg-gray-200 rounded-sm p-1">{estagio.vagas ? estagio.vagas + ' Vagas' : 'Quantidade de Vagas Indefinidas'}</p>
              </div>
              <button className="border border-blue-600 p-2 w-full rounded-lg text-blue-600 text-sm font-semibold hover:bg-blue-600 hover:text-white">Ver Detalhes</button>
            </div>
            
          )
          ))
          :
          (
          <div className="flex flex-col bg-white p-12 rounded-2xl shadow-sm items-center text-center">
            <SearchX className="w-18 h-18 bg-gray-200 text-slate-500 p-3 rounded-full shrink-0 mb-3" />
            <h1 className="text-2xl font-semibold">Nenhuma vaga disponível no momento</h1>
            <p>Fique atento! Novas oportunidades podem surgir a qualquer instante.</p>
          </div>
          ) }
      </section>

      </div>

      

    </main>
  );
}