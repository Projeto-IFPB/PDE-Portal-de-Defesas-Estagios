"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  CardAlterarImagemPerfilDesktop,
  CardAlterarImagemPerfilMobile,
} from "@/components/CardAlterarImagemPerfil";
import CabecalhoPaginas from "@/components/CabecalhoPaginas";
import CardInformacoesPerfil from "@/components/CardInformacoesPerfil";
import CardEditarPerfil from "@/components/CardEditarPerfil";

export default function Dashboard() {
  const { usuario } = useAuth();

  // Prevenção de quebra caso o usuário demore a carregar
  if (!usuario) return <p>Carregando perfil...</p>;
    const datacadastro = new Date(usuario.dataCadastro).toLocaleDateString("pt-BR", {timeZone: "UTC",})

  return (
    <>
      <main className="col-span-4 p-6">
        <CabecalhoPaginas
          titulo="Meu Perfil"
          subtitulo="Gerencie suas informações pessoais e configurações da conta."
        />

        {/* Usando gap-6 para dar aquele respiro entre as duas colunas no desktop */}
        <section className="alterar_foto grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8 items-start">
          {/* Coluna da Esquerda: Fotos e Info (ocupa 1/4 no desktop) */}
          <div className="lg:col-span-1 space-y-4">
            <CardAlterarImagemPerfilMobile />
            <CardAlterarImagemPerfilDesktop />

            <CardInformacoesPerfil
              dataCadastro={datacadastro}
              perfil={usuario.perfil}
            />
          </div>

          {/* Coluna da Direita: Edição (ocupa 3/4 no desktop) */}
          <div className="lg:col-span-3">
            <CardEditarPerfil />
          </div>
        </section>
      </main>
    </>
  );
}
