"use client";

import { ArrowLeft, FileText, Star, Briefcase, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import CardTags from "@/components/CardTags";
import CardListaRequisitos from "@/components/CardListaRequisitos";

const descricaoMobile = [
  "Estamos em busca de um Desenvolvedor Front-End talentoso e apaixonado por tecnologia para se juntar à nossa equipe. Você trabalhará na criação e manutenção de interfaces de usuário modernas e responsivas para nossos produtos digitais.",
  "O foco principal será o desenvolvimento de componentes reutilizáveis, garantindo a melhor experiência do usuário e colaborando diretamente com nossa equipe de design.",
];

const descricaoDesktop = [
  "Estamos em busca de um estagiário de Design de Produto (UI/UX) apaixonado por criar experiências digitais incríveis. Você terá a oportunidade de aprender e contribuir com projetos reais, desde a concepção até a entrega, trabalhando lado a lado com designers seniores e desenvolvedores.",
  "O foco principal será auxiliar na criação de wireframes, protótipos interativos e designs de alta fidelidade para plataformas web e mobile, sempre pensando na melhor experiência para o usuário final.",
];

const requisitos = [
  "Cursando Design, Publicidade, TI ou áreas correlatas (a partir do 2º ano).",
  "Conhecimento sólido em ferramentas de prototipagem (Figma é indispensável).",
  "Noções básicas de acessibilidade digital e design responsivo.",
  "Desejo de aprender sobre metodologias ágeis (Scrum/Kanban).",
];

const tags = ["Figma", "JavaScript", "python", "java"];

export default function VagaEstagio() {
  const router = useRouter();

  return (
    <>
      {/* ===== MOBILE (< md) ===== */}
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
            <h2 className="text-xl font-bold text-gray-800">Desenvolvedor Front-End</h2>
            <Link
              href="#"
              className="text-blue-600 font-medium text-sm mt-1 hover:underline"
            >
              TechNova Solutions
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <SectionHeader icon={<FileText className="w-5 h-5 text-blue-600" />} title="Sobre a Vaga" />
            {descricaoMobile.map((paragrafo, i) => (
              <p key={i} className="text-gray-500 text-sm leading-relaxed mb-3 last:mb-0">
                {paragrafo}
              </p>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <SectionHeader icon={<Star className="w-5 h-5 text-blue-600" />} title="Requisitos & Diferenciais" />
            <CardTags tags={tags} />
          </div>
        </div>
      </div>

      {/* ===== DESKTOP (md+) ===== */}
      <div className="hidden md:block bg-gray-50 p-8">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 flex items-start gap-6">
            <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 mb-3">
                <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Estágio
                </span>
                <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                  Urgente
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Design de Produto (UI/UX) - Estagiário
              </h2>
              <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-sm">
                <Briefcase className="w-4 h-4" />
                <span>TechNova Solutions</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <SectionHeader
              icon={<FileText className="w-5 h-5 text-blue-600" />}
              title="Descrição da Vaga"
              size="lg"
            />
            {descricaoDesktop.map((paragrafo, i) => (
              <p key={i} className="text-gray-500 text-sm leading-relaxed mb-3 last:mb-0">
                {paragrafo}
              </p>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <SectionHeader
              icon={<Check className="w-5 h-5 text-green-700" />}
              title="Requisitos e Qualificações"
              size="lg"
            />
            <CardListaRequisitos items={requisitos} />
          </div>
        </div>
      </div>
    </>
  );
}
