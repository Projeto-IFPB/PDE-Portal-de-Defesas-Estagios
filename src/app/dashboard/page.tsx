'use client';

import CabecalhoBoasVindas from "@/components/CabecalhoBoasVindas";
import CardInformativo from "@/components/CardInformativo";
import { CardEstagioRecomendado, CardNenhumEstagioDisponivel } from "@/components/CardEstagioRecomendado";
import { cardsAluno, cardsOrientador, cardsCoordenador } from "@/data/cards-dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { listarEstagiosRecomendados,listarEstagiosPorOrientadorId, buscarUsuarioPorId, obterCaminhoFotoPerfil, obterUrlPublicaFotoPerfil } from "@/lib/supabase/functions-select";
import { useEffect, useState } from "react";
import { Estagio, EstagioRecomendado} from "@/lib/supabase/interfaces";
import OrientacaoCard, { handleVerDetalhes } from '@/components/CardOrientacoes';

//coloquei um id provisorio so para testar, quando colocarmos o login vamos puxar pelo id no local-storage
const id_orientador = "db64bcca-172c-4b19-b3fe-33aea90e4df3"

export default function Dashboard() {
  const { usuario, setUsuario } = useAuth();

  const [orientacoes, setOrientacoes ] = useState<Estagio[]>([])
  useEffect(() => {
    async function carregarOrientacoes() {
      const estagios = await listarEstagiosPorOrientadorId(id_orientador);
      if (estagios) {
        const estagiosComAluno = await Promise.all(estagios.map(async (estagio) => {
          const usuario = await buscarUsuarioPorId(estagio.Id_estagiario);
          const caminhoFoto = await obterCaminhoFotoPerfil(estagio.Id_estagiario);

          
          let fotoUrl = await obterUrlPublicaFotoPerfil(caminhoFoto);
          

          return {
            ...estagio,
            nome_estagiario: usuario?.["Nome-Completo"] || "Aluno Não Encontrado",
            email_estagiario: usuario?.Email || "Email não encontrado",
            foto_estagiario: fotoUrl
          };
        }));
        setOrientacoes(estagiosComAluno);
      }
    }
    carregarOrientacoes();
  }, []);

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
        </section>

      <section className={`lg:col-span-1 space-y-3 ${usuario.perfil !== 'aluno' ? 'hidden' : 'mt-10'}`}>
        <h2 className="text-xl font-semibold">Estágios Disponíveis</h2>

        { estagiosDisponiveis.length > 0 ? (
          estagiosDisponiveis.map((estagio) => (
            <CardEstagioRecomendado key={estagio.id} estagio={estagio} />   
          ))) :
          (
            <CardNenhumEstagioDisponivel />
          )}
      </section>
      </div>
          {(usuario.perfil === 'orientador' || usuario.perfil === 'coordenador') && (
        <section className="my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Minhas Orientações</h2>
      
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {orientacoes.map((orientacao) => (

            <OrientacaoCard
            key={orientacao.id}
            id= {orientacao.id}
            nomeEstagiario={orientacao.nome_estagiario || "Sem nome"}
            emailEstagiario={orientacao.email_estagiario || "Sem email"}
            empresa={orientacao.empresa}
            data={orientacao.data_de_inicio}
            status={orientacao.status}
            onVerDetalhes={handleVerDetalhes}
            foto_perfil={orientacao.foto_estagiario}
          />
        ))}
      </div>
        </section>
      )}
      

    </main>
  );
}