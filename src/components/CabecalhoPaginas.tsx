export default function CabecalhoPaginas({ titulo, subtitulo }: {titulo: string, subtitulo: string}) {
    return (
        <>
            <h1 className="text-2xl font-semibold dark:text-slate-50">{ titulo }</h1>
            <p className="text-slate-600 text-sm dark:text-slate-400">{ subtitulo }</p>
        </>
    )
}