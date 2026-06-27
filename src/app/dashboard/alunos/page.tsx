"use client"

import { useEffect, useState } from "react";
import { listarEstagiosPorOrientadorId } from "@/lib/supabase/functions-select";
import CabecalhoPaginas from "@/components/CabecalhoPaginas";
import { useOrientacoes } from "@/hooks/useOrientacoes";
import OrientacaoCard from "@/components/CardOrientacoes";

export default function Dashboard() {
  const { orientacoes } = useOrientacoes();

    return (
        <>
          <main className="col-span-4 p-6">
          {/* Todo o conteúdo da página deve ficar aqui */}
            <CabecalhoPaginas titulo="Meus Alunos" subtitulo="Gerencie e acompanhe todos os alunos que você orienta, ou já orientou." />

            <section className="mt-10 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {orientacoes.map((orientacao) => (
                        <OrientacaoCard
                          key={orientacao.id}
                          id={orientacao.id}
                          nomeEstagiario={orientacao.nome_estagiario || "Sem nome"}
                          emailEstagiario={orientacao.email_estagiario || "Sem email"}
                          empresa={orientacao.empresa}
                          data={orientacao.data_de_inicio}
                          status={orientacao.status}
                          foto_perfil={orientacao.foto_estagiario}
                        />
                      ))}
                    </div>
                  </section>
            
          </main>
        </>
      );
}