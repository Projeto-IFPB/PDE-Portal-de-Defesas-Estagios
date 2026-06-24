export default function CabecalhoPaginas({ titulo, subtitulo }: {titulo: string, subtitulo: string}) {
    return (
        <>
            <h1 className="text-2xl font-semibold">{ titulo }</h1>
            <p className="text-slate-600 text-sm">{ subtitulo }</p>
        </>
    )
}