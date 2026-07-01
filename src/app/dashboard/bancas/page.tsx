"use client";

import CabecalhoPaginas from "@/components/CabecalhoPaginas";
import { CardBancaDefesa, CardNenhumaBanca } from "@/components/CardBancaDefesa";
import { useAuth } from "@/contexts/AuthContext";
import { listarDefesasAluno } from "@/lib/supabase/functions-select";
import { useState, useEffect } from "react";

export default function Bancas() {
  const { usuario } = useAuth();
  const [bancas, setBancas] = useState<any[] | null>(null);

  useEffect(() => {
    async function carregarBancas() {
      const dados = await listarDefesasAluno(usuario.id);
      if (dados) {
        setBancas(dados);
      }
    }
    carregarBancas();
  }, []);

    return (
        <>
          <main className="col-span-4 p-6">
            <CabecalhoPaginas titulo="Minhas Bancas" subtitulo="Gerencie e acompanhe o cronograma de defesas agendadas para o semestre." />

            <section className="cards_bancas mt-8">

              {bancas && bancas.length > 0 ? (
                bancas.map((card, index) => {
                const banca = typeof card.banca_examinadora === "string"
                  ? JSON.parse(card.banca_examinadora)
                  : card.banca_examinadora;
                return (
                <CardBancaDefesa 
                key={index} 
                data={new Date(card.data_defesa).toLocaleDateString("pt-BR")}
                status={card.status}
                titulo={card.titulo}
                horario={card.horario_defesa}
                local={card.local_defesa}
                banca={banca}
                />
                );
              })
              ) : (
                <CardNenhumaBanca />
              )
            }
            </section>

          </main>
        </>
      );
}