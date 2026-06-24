import { supabase } from "@/lib/supabase/supabaseClient";
import { 
  ChevronRight, 
  FileText, 
  Mail, 
  GraduationCap, 
  Briefcase 
} from "lucide-react";

export default async function DetalhesAlunoPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // Busca do usuário no banco
  const { data: user, error } = await supabase
    .from('Usuarios')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !user) {
    return <div className="p-8 flex items-center justify-center h-full text-gray-500">Aluno não encontrado.</div>;
  }

  // ==========================================
  // DADOS MOCKADOS (Substitua pelas suas queries reais do Supabase depois)
  // ==========================================
  const estagio = {
    empresa: "TechNova Solutions",
    orientador: "Dr. Ricardo Silva",
    dataInicio: "15 de Outubro de 2023",
    cargaHoraria: "30 horas",
    progresso: 75,
    previsaoTermino: "Dez 2024",
    status: "Em andamento"
  };
  
  const curso = "Engenharia de Software";
  const emailCorporativo = "ryan.enriq@technova.com";
  // ==========================================

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Alunos</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-blue-600 font-medium">{user.Nome_Completo || "Nome do Aluno"}</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Detalhes do Aluno</h1>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ================= COLUNA ESQUERDA (Perfil) ================= */}
        <div className="space-y-6">
          
          {/* Card de Perfil */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden mb-4">
              {/* Substitua pelo campo de foto do seu banco, se houver */}
              <img 
                src={user.foto_perfil || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.Nome_Completo || "Aluno")} 
                alt="Foto de perfil" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.Nome_Completo || "Ryan Enriq"}</h2>
            <p className="text-sm text-gray-500 mb-6">Estudante de Engenharia</p>
            
            <button className="w-full flex items-center justify-center gap-2 bg-[#0052cc] hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors">
              <FileText className="w-4 h-4" />
              Gerar Relatório de Atividades
            </button>
          </div>

          {/* Card de Informações Pessoais */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-5">
              Informações Pessoais
            </h3>
            
            <div className="space-y-5">
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email Corporativo</p>
                  <p className="text-sm font-semibold text-gray-900">{emailCorporativo}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <GraduationCap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Curso</p>
                  <p className="text-sm font-semibold text-gray-900">{curso}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= COLUNA DIREITA (Progresso e Detalhes) ================= */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card de Progresso */}
          <div className="bg-[#0052cc] rounded-2xl shadow-sm p-6 text-white relative overflow-hidden">
            {/* Efeito visual de fundo opcional (ondas/gradiente) */}
            <div className="absolute right-0 top-0 w-64 h-full bg-blue-600 opacity-20 skew-x-12 translate-x-10"></div>
            
            <h3 className="text-lg font-semibold mb-1 relative z-10">Progresso do Estágio</h3>
            <p className="text-blue-100 text-sm mb-6 relative z-10">
              O aluno está no caminho certo para concluir as horas obrigatórias.
            </p>
            
            <div className="relative z-10">
              {/* Barra de progresso */}
              <div className="w-full bg-blue-900/40 rounded-full h-3 mb-2 overflow-hidden">
                <div 
                  className="bg-[#69f0ae] h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${estagio.progresso}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-end mt-2">
                <p className="text-xs text-blue-100 font-medium">Início: {estagio.dataInicio}</p>
                <span className="text-3xl font-bold">{estagio.progresso}%</span>
                <p className="text-xs text-blue-100 font-medium">Previsão: {estagio.previsaoTermino}</p>
              </div>
            </div>
          </div>

          {/* Card de Detalhes do Estágio */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Detalhes do Estágio</h3>
              </div>
              <span className="px-3 py-1 bg-[#b9f6ca] text-green-800 text-xs font-semibold rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                {estagio.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
              <div className="border-l-2 border-gray-200 pl-4">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Empresa</p>
                <p className="text-base font-semibold text-gray-900">{estagio.empresa}</p>
              </div>
              
              <div className="border-l-2 border-gray-200 pl-4">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Orientador Acadêmico</p>
                <p className="text-base font-semibold text-gray-900">{estagio.orientador}</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-4">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Data de Início</p>
                <p className="text-base font-semibold text-gray-900">{estagio.dataInicio}</p>
              </div>

              <div className="border-l-2 border-gray-200 pl-4">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Carga Horária Semanal</p>
                <p className="text-base font-semibold text-gray-900">{estagio.cargaHoraria}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}