interface PropsCabecalhoBoasVindas {
  titulo: string;
  subtitulo: string;
}

export default function CabecalhoBoasVindas({ titulo, subtitulo }: PropsCabecalhoBoasVindas) {
  return (
    <header className="mb-8 flex flex-col gap-2">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-slate-50">
        {titulo}
      </h1>
      <p className="max-w-2xl text-sm text-slate-600 md:text-base dark:text-slate-400">
        {subtitulo}
      </p>
    </header>
  );
}