import { supabase } from "@/lib/supabase/supabaseClient";

export default async function DetalhesAlunoPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  // Busca direta usando o ID que veio na URL
  const { data: user, error } = await supabase
    .from('Usuarios')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !user) {
    return <div className="p-8">Aluno não encontrado.</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Aluno</h1>
      <p>ID do Banco: {user.id}</p>
      <p>Nome: {user.Nome_Completo}</p>
      {/* Monte o resto do seu layout aqui */}
    </div>
  );
}