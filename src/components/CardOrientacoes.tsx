// src/components/CardOrientacoes.tsx
export default function CardOrientacoes({ 
  titulo, 
  descricao, 
}: { 
  titulo: string; 
  descricao: string;
}) {

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{titulo}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{descricao}</p>
    </div>
  );
}