import Link from "next/link";
import { buscarUsuarioPorId, buscarEstagioPorId, obterCaminhoFotoPerfil, obterUrlPublicaFotoPerfil } from "@/lib/supabase/functions-select";
import { StatusSection } from "./StatusSection";
import { 
  ChevronRight, 
  FileText, 
  Mail, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  Clock 
} from "lucide-react";

const statusConfig: Record<string, { label: string; classes: string }> = {
  pendente: { label: "Pendente", classes: "bg-red-100 text-red-800 border-red-200" },
  em_andamento: { label: "Em Andamento", classes: "bg-blue-100 text-blue-800 border-blue-200" },
  concluido: { label: "Concluído", classes: "bg-emerald-100 text-emerald-800 border-emerald-200" },
};

export default async function DetalhesAlunoPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  const estagio = await buscarEstagioPorId(id);

  if (!estagio) {
    return (
      <div className="p-8 flex items-center justify-center h-[60vh] text-gray-500 font-medium">
        Estágio não encontrado no sistema.
      </div>
    );
  }

  const [usuario, caminhoFoto, orientador] = await Promise.all([
    buscarUsuarioPorId(estagio.Id_estagiario),
    obterCaminhoFotoPerfil(estagio.Id_estagiario),
    buscarUsuarioPorId(estagio.Id_orientador)
  ]);

  if (!usuario) {
    return (
      <div className="p-8 flex items-center justify-center h-[60vh] text-gray-500 font-medium">
        Dados do aluno vinculado a este estágio não foram encontrados.
      </div>
    );
  }
  if (!orientador) {
    return (
      <div className="p-8 flex items-center justify-center h-[60vh] text-gray-500 font-medium">
        Dados de orientador vinculado a este estágio não foram encontrados.
      </div>
    );
  }

  const fotoUrl = await obterUrlPublicaFotoPerfil(caminhoFoto || "sem_foto_perfil.jpg");
  
  const agora = new Date();
  const dataInicio = estagio.data_de_inicio ? new Date(estagio.data_de_inicio) : null;
  const dataFim = estagio.previsao_data_fim ? new Date(estagio.previsao_data_fim) : null;
  
  const isPendente = estagio.status?.toLowerCase() === "pendente";
  
  let progressoEstagio = 0;

  if (!isPendente && dataInicio && dataFim) {
    const tempoTotal = dataFim.getTime() - dataInicio.getTime();
    const tempoDecorrido = agora.getTime() - dataInicio.getTime();

    if (tempoTotal > 0) {
      progressoEstagio = Math.max(0, Math.min(100, Math.round((tempoDecorrido / tempoTotal) * 100)));
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      
      <div className="flex items-center text-sm text-gray-500 mb-4 select-none">
        <Link href="/dashboard/alunos" className="hover:text-gray-700 cursor-pointer transition-colors">Alunos</Link>
        <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
        <span className="text-blue-600 font-medium truncate">{usuario.Nome_Completo}</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Detalhes do Aluno</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden mb-4 bg-gray-100 shrink-0">
              <img src={fotoUrl} alt={usuario.Nome_Completo} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 line-clamp-2 px-2">{usuario.Nome_Completo}</h2>
            <p className="text-sm text-gray-500 mb-6">Matrícula Regularizada</p>
            
            <button className="w-full flex items-center justify-center gap-2 bg-[#0052cc] hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-medium shadow-sm transition-all duration-200 active:scale-[0.98]">
              <FileText className="w-4 h-4" /> Gerar Relatório de Atividades
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">Informações Pessoais</h3>
            <div className="space-y-5">
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-blue-50 rounded-lg text-[#0052cc] shrink-0"><Mail className="w-4 h-4" /></div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 font-medium">Email Corporativo</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{usuario.Email || "Não informado"}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-blue-50 rounded-lg text-[#0052cc] shrink-0"><GraduationCap className="w-4 h-4" /></div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-500 font-medium">Curso</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{estagio.curso || "Engenharia de Software"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0052cc] rounded-2xl shadow-sm p-6 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-full bg-blue-600 opacity-20 skew-x-12 translate-x-12 pointer-events-none" />
            <h3 className="text-lg font-semibold mb-1">Progresso do Estágio</h3>
            <p className="text-blue-100 text-sm mb-6">Métricas correspondentes ao cumprimento das etapas obrigatórias.</p>
            
            <div>
              <div className="w-full bg-blue-950/40 rounded-full h-3 mb-2 overflow-hidden border border-blue-800/20">
                <div className="bg-[#69f0ae] h-3 rounded-full transition-all duration-500" style={{ width: `${progressoEstagio}%` }} />
              </div>
              <div className="flex justify-between items-end mt-3">
                <div className="flex items-center gap-1.5 text-xs text-blue-100">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Início: {isPendente ? (
                      <span className="text-red-400 font-semibold">Pendente</span>
                    ) : dataInicio ? (
                      dataInicio.toLocaleDateString("pt-BR", { timeZone: "UTC" })
                    ) : (
                      "--/--/----"
                    )}
                  </span>
                </div>
                <span className="text-3xl font-bold tracking-tight">{progressoEstagio}%</span>
                <div className="flex items-center gap-1.5 text-xs text-blue-100">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Previsão Fim: {dataFim ? dataFim.toLocaleDateString("pt-BR", { timeZone: "UTC" }) : "--/--/----"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <Briefcase className="w-5 h-5 text-[#0052cc] shrink-0" />
                <h3 className="text-lg font-semibold text-gray-900 truncate">Detalhes do Estágio</h3>
              </div>
              
              <StatusSection 
                estagioId={id} 
                statusRaw={estagio.status} 
                statusConfig={statusConfig} 
              />
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6">
              <div className="border-l-2 border-gray-100 pl-4">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Empresa contratante</p>
                <p className="text-base font-semibold text-gray-900">{estagio.empresa || "Não informada"}</p>
              </div>
              <div className="border-l-2 border-gray-100 pl-4">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Supervisor / Orientador</p>
                <p className="text-base font-semibold text-gray-900">{orientador.Nome_Completo || "Orientador Acadêmico"}</p>
              </div>
              <div className="border-l-2 border-gray-100 pl-4">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Data de Ingresso</p>
                <p className="text-base font-semibold text-gray-900">
                  {isPendente ? (
                    <span className="text-red-400 font-semibold">Pendente</span>
                  ) : estagio.data_de_inicio ? (
                    new Date(estagio.data_de_inicio).toLocaleDateString("pt-BR", { timeZone: "UTC" })
                  ) : (
                    "Não informada"
                  )}
                </p>
              </div>
              <div className="border-l-2 border-gray-100 pl-4">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Regime Horário Semanal</p>
                <p className="text-base font-semibold text-gray-900">
                  {estagio.carga_horaria ? `${estagio.carga_horaria} horas semanais` : "Não informada"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}