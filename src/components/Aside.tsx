'use client';

import DashboardOutlineIcon from '@iconify-react/material-symbols/dashboard-outline';
import CalendarMonthOutlineIcon from '@iconify-react/material-symbols/calendar-month-outline';
import PeoplesIcon from '@iconify-react/icon-park-outline/peoples';
import PeopleIcon from '@iconify-react/icon-park-outline/people';

export default function Aside(props: Readonly<{ perfil: 'aluno' | 'orientador' | 'coordenador' }>) {
    return (
        <aside className="hidden md:block lg:block col-span-1 h-screen bg-gray-50 px-4 pt-3 shadow-sm">
            <h1 className="text-blue-700 font-bold -mb-1">PDE</h1>
            <p className="text-[0.7rem] font-medium text-gray-600 mb-6">
                Portal do {props.perfil === 'aluno' ? 'Aluno' : props.perfil === 'orientador' ? 'Orientador' : 'Coordenador'}
            </p>

            <div className="text-gray-700 font-medium text-sm mx-1 space-y-2">
                <div className="flex items-center gap-2 p-2 hover:bg-gray-200 hover:text-blue-700 rounded-md">
                    <DashboardOutlineIcon className="w-4 h-4" />
                    <h3>Início</h3>
                </div>
                
                <div className="flex items-center gap-2 p-2 hover:bg-gray-200 hover:text-blue-700 rounded-md">
                        <PeoplesIcon height="1em" className="w-4 h-4" />
                        <h3>{props.perfil === 'aluno' ? 'Bancas' : 'Alunos'}</h3>
                </div>

                <div className="flex items-center gap-2 p-2 hover:bg-gray-200 hover:text-blue-700 rounded-md">
                    <CalendarMonthOutlineIcon className="w-4 h-4" />
                    <h3>Calendário</h3>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-gray-200 hover:text-blue-700 rounded-md">
                    <PeopleIcon className="w-4 h-4" />
                    <h3>Perfil</h3>
                </div>

            </div>
        </aside>
    )
}