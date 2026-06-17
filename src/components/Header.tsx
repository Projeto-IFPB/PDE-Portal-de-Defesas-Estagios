'use client';

import NotificationsOutlineIcon from '@iconify-react/material-symbols/notifications-outline';
import DarkModeOutlineIcon from '@iconify-react/material-symbols/dark-mode-outline';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
    const { usuario } = useAuth();

    return (
        <header className='hidden md:flex items-center justify-end gap-4 h-16 px-6 bg-white w-full'>
            <button className='p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer' aria-label='Notificações'>
                <NotificationsOutlineIcon className='w-5 h-5 text-gray-600 hover:text-blue-700' />
            </button>

            <button className='p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer' aria-label='Alternar tema'>
                <DarkModeOutlineIcon className='w-5 h-5 text-gray-600 hover:text-blue-700' />
            </button>

            <div className='text-right border-l border-gray-300 pl-4'>
              <p className='font-semibold text-sm whitespace-nowrap'> {usuario.nome}</p>
              <p className='text-xs text-gray-500 capitalize'>
                {usuario.perfil}
              </p>
            </div>

            <div className='w-10 h-10 rounded-full bg-gray-300 flex-shrink-0'>
            </div>
        </header>
    );
}