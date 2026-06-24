import CabecalhoPaginas from "@/components/CabecalhoPaginas";

export default function Dashboard() {
    return (
        <>
          <main className="col-span-4 p-6">
          {/* Todo o conteúdo da página deve ficar aqui */}
            <CabecalhoPaginas titulo="Minhas Bancas" subtitulo="Gerencie e acompanhe o cronograma de defesas agendadas para o semestre." />
          </main>
        </>
      );
}