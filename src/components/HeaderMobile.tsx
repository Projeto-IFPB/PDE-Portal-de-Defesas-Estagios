'use client';

import DarkModeOutlineIcon from '@iconify-react/material-symbols/dark-mode-outline';
import { useAuth } from '@/contexts/AuthContext';



export default function HeaderMobile() {
    const { usuario } = useAuth();

    return (
        <header className='flex md:hidden sticky top-0 z-30 items-center justify-between h-16 px-4 bg-white'>
            <h1 className='font-bold text-blue-700'>
                PDE
            </h1>

            <div className='flex items-center gap-3'>
            <button className='p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer' aria-label='Alternar tema'>
                <DarkModeOutlineIcon className='w-5 h-5 text-gray-600 hover:text-blue-700' />
            </button>

                
                <div className='w-10 h-10 rounded-full shrink-0 overflow-hidden'>
                    {usuario.fotoPerfil && (
                    <img src={usuario.fotoPerfil} alt={usuario.nome} className='w-full h-full object-cover' />
                )}
            </div>
            </div>
        </header>
    );
}
