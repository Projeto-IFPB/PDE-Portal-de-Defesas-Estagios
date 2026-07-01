"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Star, Briefcase, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import CardTags from "@/components/CardTags";
import CardListaRequisitos from "@/components/CardListaRequisitos";
import { buscarEstagioRecomendadoPorId } from "@/lib/supabase/functions-select";
import type { EstagioRecomendado } from "@/lib/supabase/interfaces";

export default function VagaEstagio() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [estagio, setEstagio] = useState<EstagioRecomendado | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function carregar() {
      setLoading(true);
      const dados = await buscarEstagioRecomendadoPorId(id);
      setEstagio(dados);
      setLoading(false);
    }

    carregar();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
        Carregando...
      </div>
    );
  }

  if (!estagio) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500 gap-4">
        <p className="text-lg font-semibold">Vaga não encontrada</p>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline text-sm cursor-pointer"
        >
          Voltar
        </button>
      </div>
    );
  }

  const parceiros = estagio.competencia?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  const paragrafos = estagio.descricao?.split("\n\n").filter(Boolean) ?? [];

  return (
    <>
      {/* ===== MOBILE ===== */}
      <div className="md:hidden bg-gray-50 min-h-screen">
        <div className="flex items-center px-4 h-14 bg-white border-b border-gray-200">
          <button
            onClick={() => router.back()}
            className="p-1 -ml-1 rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
          <h1 className="flex-1 text-center font-semibold text-gray-800 text-base">
            Detalhes da Vaga
          </h1>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{estagio.titulo}</h2>
            {estagio.empresa && (
              <span className="text-blue-600 font-medium text-sm mt-1">
                {estagio.empresa}
              </span>
            )}
            {estagio.vagas && (
              <span className="text-gray-500 text-xs mt-2">
                {estagio.vagas} {estagio.vagas === 1 ? "vaga disponível" : "vagas disponíveis"}
              </span>
            )}
          </div>

          {paragrafos.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <SectionHeader icon={<FileText className="w-5 h-5 text-blue-600" />} title="Sobre a Vaga" />
              {paragrafos.map((paragrafo, i) => (
                <p key={i} className="text-gray-500 text-sm leading-relaxed mb-3 last:mb-0">
                  {paragrafo}
                </p>
              ))}
            </div>
          )}

          {parceiros.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <SectionHeader icon={<Star className="w-5 h-5 text-blue-600" />} title="Competências" />
              <CardTags tags={parceiros} />
            </div>
          )}
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="hidden md:block bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 flex items-start gap-6">
            <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 mb-3">
                <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {estagio.vagas ? `${estagio.vagas} vaga${estagio.vagas > 1 ? "s" : ""}` : "Estágio"}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{estagio.titulo}</h2>
              {estagio.empresa && (
                <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-sm">
                  <Briefcase className="w-4 h-4" />
                  <span>{estagio.empresa}</span>
                </div>
              )}
            </div>
          </div>

          {paragrafos.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <SectionHeader
                icon={<FileText className="w-5 h-5 text-blue-600" />}
                title="Descrição da Vaga"
                size="lg"
              />
              {paragrafos.map((paragrafo, i) => (
                <p key={i} className="text-gray-500 text-sm leading-relaxed mb-3 last:mb-0">
                  {paragrafo}
                </p>
              ))}
            </div>
          )}

          {parceiros.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <SectionHeader
                icon={<Check className="w-5 h-5 text-green-700" />}
                title="Competências"
                size="lg"
              />
              <CardListaRequisitos items={parceiros} />
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
