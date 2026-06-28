import { Estagio } from "@/lib/supabase/interfaces";
import BuildingIcon from '@iconify-react/mdi/building';
import PeopleIcon from '@iconify-react/icon-park-solid/people';
import GraduationCapFillIcon from '@iconify-react/ri/graduation-cap-fill';

interface CardEstagioAlunoProps {
    estagio: Estagio;
    orientador: string;
    curso: string;
}

const statusConfig = {
    pendente: {
        label: 'Pendente',
        classes: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    },

    em_andamento: {
        label: 'Em andamento',
        classes: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300'
    },

    concluido: {
        label: 'Concluído',
        classes: 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-300'
    }
};

export function CardEstagioAluno({
    estagio,
    orientador,
    curso,
}: CardEstagioAlunoProps) {
    const dataFormatada = new Date(estagio.data_de_inicio).toLocaleDateString('pt-BR', {timeZone:'UTC'});
    const currentStatus =statusConfig[estagio.status];
    return (
        <>
        <div className="hidden md:block bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm dark:shadow-slate-800 p-7 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                        <BuildingIcon className="w-8 h-8 text-blue-700 dark:text-blue-400"/>
                    </div>

                    <div>    
                        <h2 className="text-xl font-semibold dark:text-white">
                            {estagio.empresa}
                        </h2>

                        <p className="text-gray-600 dark:text-slate-400">
                            Início: {dataFormatada}
                        </p>
                    </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-medium ${currentStatus.classes}`}>
                    {currentStatus.label}
                </span>
            </div>

            <hr className="my-4 border-gray-100 dark:border-slate-800"/>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 flex items-center gap-3 border border-transparent dark:border-slate-700">
                    <PeopleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400"/>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400">
                            ORIENTADOR
                        </p>
                    
                        <p className="font-medium dark:text-white">
                            {orientador}
                        </p>
                    </div>
                </div>
            
                <div className="bg-gray-50 rounded-xl p-4 dark:bg-slate-800 border border-transparent dark:border-slate-700 flex items-center gap-3">
                    <GraduationCapFillIcon className="w-5 h-5 text-blue-600 dark:text-blue-400"/>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400">
                            CURSO
                        </p>

                        <p className="font-medium dark:text-white">
                            {curso}
                        </p>
                    </div>
                </div>
            </div>

            <hr className="my-4 border-gray-100 dark:border-slate-800"/>
            <div className="flex justify-end">
                <button className="px-6 py-1.5 border border-blue-600 dark:border-blue-500 rounded-lg text-blue-600 dark:text-blue-400 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200">
                    Detalhes do Estágio
                </button>
            </div>
        </div>
        <div className="md:hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm p-4">
            <div className="flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                    <BuildingIcon className="w-6 h-6 text-blue-700 dark:text-blue-400" />
                </div>

                <div>
                    <h2 className="font-semibold text-lg dark:text-white"> 
                        {estagio.empresa}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                        Início: {dataFormatada}
                    </p>
                </div>
            </div>

            <hr className="my-3 border-gray-100 dark:border-slate-800"/>

            <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                    <PeopleIcon className="w-4 h-4"/>
                    <span>Orientador: {orientador}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                  <GraduationCapFillIcon className="w-4 h-4"/>
                  <span>Curso: {curso}</span>  
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${currentStatus.classes}`}>
                    {currentStatus.label}
                </span>

                <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">
                    Ver Detalhes
                </button>
            </div>
        </div>
        </>
    );
}

export function CardSemEstagios() {
    return (
        <div className="flex flex-col bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-12 rounded-2xl shadow-sm items-center text-center">
            <h2 className="text-2xl font-semibold dark:text-slate-50">
                Nenhum estágio cadastrado
            </h2>

            <p className="text-gray-600 dark:text-slate-400">
                Assim que um estágio for cadastrado aparecerá aqui.
            </p>
        </div>
    )
}