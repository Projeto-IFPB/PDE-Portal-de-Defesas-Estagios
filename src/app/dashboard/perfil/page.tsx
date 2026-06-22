'use client';

import { useAuth } from "@/contexts/AuthContext";
import { CardAlterarImagemPerfilDesktop, CardAlterarImagemPerfilMobile } from "@/components/CardAlterarImagemPerfil";

export default function Dashboard() {
  const { usuario, setUsuario } = useAuth();

  return (
    <>
    <main className="col-span-4 p-6">
    {/* Todo o conteúdo da página deve ficar aqui */}
      <section className="alterar_foto grid grid-cols-1 lg:grid-cols-4">

        <CardAlterarImagemPerfilMobile />

        <CardAlterarImagemPerfilDesktop />
      </section>
      
    </main>
    </>
    );
}