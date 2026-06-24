import { Calendar, Clock, UserRound, CalendarX } from "lucide-react";
import { InterfaceCardBancaDefesa } from "@/lib/supabase/interfaces";


export function CardBancaDefesa({data, status, titulo, horario, local, banca}: InterfaceCardBancaDefesa) {
    return (
        <>
            <div className="bg-white p-4 rounded-xl">
                <div className="flex justify-between mb-5">
                    <div className="flex text-blue-700 font-semibold items-center">
                    <Calendar className="mr-2 w-6 h-6 shrink-0" />
                    <p className="text-sm">{data}</p>
                    </div>
                    <div className={`flex rounded-full px-3 items-center ${status === 'agendado' ? 'bg-yellow-300 text-yellow-800' : 'bg-green-300 text-green-800'}`}><p className="text-[0.8rem]">{status}</p></div>
                    
                </div>

                <h1 className="text-xl font-semibold mb-2">{titulo}</h1>

                <div className="flex items-center text-sm text-slate-600 mb-4">
                    <Clock className="w-5 h-5 mr-1 shrink-0" />
                    <p>{horario}</p>
                    <p className="mx-1">•</p>
                    <p>{local}</p>
                </div>

                <div className="bg-slate-100 p-3 rounded-md space-y-3">
                    <p className="uppercase font-semibold text-[0.8rem] text-slate-600">Banca Examinadora</p>
                    {banca.map((membro, i) => (
                    <div key={i} className="flex items-center">
                    <div className="flex bg-slate-300 p-[0.4rem] rounded-full mr-2 items-center"><UserRound className="w-4 h-4 shrink-0" /></div>
                    <p className="text-slate-700">{membro.nome}</p>
                    </div>
                    ))}
                </div>
            </div>
        </>
        )
}

export function CardNenhumaBanca() {
    return (
        <>
        <div className="bg-white py-10 flex flex-col text-center items-center">
            <div className="bg-blue-100 p-6 m-auto rounded-full mb-4">
                <CalendarX className="w-10 h-10 text-blue-800" strokeWidth={1.2}/>
            </div>
            <div className="max-w-80 text-center">
                <h1 className="text-xl font-semibold mb-3">Nenhuma banca agendada</h1>
                <p className="text-slate-500">Você não possui banca de defesa agendada para este semestre. Novas bancas aparecerão aqui quando forem confirmadas.</p>
            </div>
        </div>
        </>
    )
}