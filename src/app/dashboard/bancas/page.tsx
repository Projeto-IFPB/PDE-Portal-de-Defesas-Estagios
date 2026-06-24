import CabecalhoPaginas from "@/components/CabecalhoPaginas";
import { Calendar, Clock, UserRound } from 'lucide-react';

export default function Bancas() {
    return (
        <>
          <main className="col-span-4 p-6">
          {/* Todo o conteúdo da página deve ficar aqui */}
            <CabecalhoPaginas titulo="Minhas Bancas" subtitulo="Gerencie e acompanhe o cronograma de defesas agendadas para o semestre." />

            <section className="cards_bancas mt-8">

              <div className="bg-white p-4 rounded-xl">
                <div className="flex justify-between mb-5">
                  <div className="flex text-blue-700 font-semibold items-center">
                    <Calendar className="mr-2 w-6 h-6 shrink-0" />
                    <p className="text-sm">15 de Outubro, 2026</p>
                  </div>
                  <div className="flex bg-green-300 rounded-full px-3 text-green-800 items-center"><p className="text-[0.8rem]">Confirmada</p></div>
                  
                </div>

                <h1 className="text-xl font-semibold mb-2">Impactos da IA no Design Educacional</h1>

                <div className="flex items-center text-sm text-slate-600 mb-4">
                  <Clock className="w-5 h-5 mr-1 shrink-0" />
                  <p>14:00</p>
                  <p className="mx-1">•</p>
                  <p>Auditório UA2</p>
                </div>

                <div className="bg-slate-100 p-3 rounded-md space-y-3">
                  <p className="uppercase font-semibold text-[0.8rem] text-slate-600">Banca Examinadora</p>
                  <div className="flex items-center">
                    <div className="flex bg-slate-300 p-[0.4rem] rounded-full mr-2 items-center"><UserRound className="w-4 h-4 shrink-0" /></div>
                    <p className="">Prof. Dr. Petrônio Medeiros</p>
                  </div>
                </div>
              </div>

            </section>

          </main>
        </>
      );
}