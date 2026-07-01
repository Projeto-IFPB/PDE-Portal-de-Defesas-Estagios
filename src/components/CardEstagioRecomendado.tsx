import { EstagioRecomendado } from "@/lib/supabase/interfaces";
import { SearchX } from 'lucide-react';



export function CardEstagioRecomendado({ estagio }: { estagio: EstagioRecomendado }) {
    return (
        <div key={estagio.id} className="bg-white p-5 rounded-2xl shadow-sm space-y-1 dark:bg-slate-900 dark:shadow-slate-800">
              <h2 className="text-xl font-semibold -mb-1 dark:text-slate-50">{estagio.titulo}</h2>
              <h4 className="text-slate-600 font-semibold text-[0.9rem] dark:text-slate-400">{estagio.empresa}</h4>

              <div className="flex text-[0.7rem] font-medium text-slate-700 gap-2 mb-5 dark:text-slate-400">
                <p className="bg-gray-200 rounded-sm p-1 dark:bg-slate-700">{estagio.competencias}</p>
                <p className="bg-gray-200 rounded-sm p-1 dark:bg-slate-700">{estagio.vagas ? estagio.vagas + ' Vagas' : 'Quantidade de Vagas Indefinidas'}</p>
              </div>
              <button className="border border-blue-600 p-2 w-full rounded-lg text-blue-600 text-sm font-semibold cursor-pointer hover:bg-blue-600 hover:text-white">Ver Detalhes</button>
            </div>
    )
}

export function CardNenhumEstagioDisponivel() {
    return (
        <div className="flex flex-col bg-white p-12 rounded-2xl shadow-sm items-center text-center dark:bg-slate-900">
            <SearchX className="w-18 h-18 bg-gray-200 text-slate-500 p-3 rounded-full shrink-0 mb-3 dark:bg-slate-700" />
            <h1 className="text-2xl font-semibold dark:text-slate-50">Nenhuma vaga disponível no momento</h1>
            <p className="dark:text-slate-400">Fique atento! Novas oportunidades podem surgir a qualquer instante.</p>
        </div>
    )
}