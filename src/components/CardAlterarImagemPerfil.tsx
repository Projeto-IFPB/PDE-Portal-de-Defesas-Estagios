import { useAuth } from "@/contexts/AuthContext";
import { Camera } from "lucide-react";
import { useRef } from 'react';
import { uploadFotoPerfil, salvarCaminhoFotoPerfil, obterUrlPublicaFotoPerfil } from "@/lib/supabase/functions-select";

export function CardAlterarImagemPerfilMobile() {
        const { usuario, setUsuario } = useAuth();

        const inputRef = useRef<HTMLInputElement>(null);

        async function handleAlterarFoto(e: React.ChangeEvent<HTMLInputElement>) {
            const arquivo = e.target.files?.[0];
            if (!arquivo) return;

            const caminho = await uploadFotoPerfil(arquivo, usuario.id);
            if (!caminho) return;

            const ok = await salvarCaminhoFotoPerfil(usuario.id, caminho, arquivo.name);
            if (!ok) return;

            const url = await obterUrlPublicaFotoPerfil(caminho);
            setUsuario({...usuario, fotoPerfil: `${url}?t-${Date.now()}`});
        }

        return (
            <div className="lg:hidden foto flex flex-col items-center mb-2">
                <div className="relative w-24 h-24">
                <img 
                className="rounded-full w-full h-full border-2 border-white object-cover shadow-md" 
                src={usuario.fotoPerfil} 
                alt="Minha foto de perfil" /> 

                <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRef}
                onChange={handleAlterarFoto} />

                <div className="icone_camera absolute bottom-0 right-0 bg-blue-700 active:bg-blue-900 p-2 rounded-full shadow-md transition-colors"
                    onClick={() => inputRef.current?.click()}>

                    <Camera className="text-white font-bold w-4 h-4" strokeWidth={2.5} />
                </div>
                </div>

                <h2 className="font-semibold text-lg text-center dark:text-slate-50">{usuario.nome}</h2>
            </div>
        )
    }

export function CardAlterarImagemPerfilDesktop() {
    const { usuario, setUsuario } = useAuth();

    const inputRef = useRef<HTMLInputElement>(null);

    async function handleAlterarFoto(e: React.ChangeEvent<HTMLInputElement>) {
        const arquivo = e.target.files?.[0];
        if (!arquivo) return;

        const caminho = await uploadFotoPerfil(arquivo, usuario.id);
        if (!caminho) return;

        const ok = await salvarCaminhoFotoPerfil(usuario.id, caminho, arquivo.name);
        if (!ok) return;

        const url = await obterUrlPublicaFotoPerfil(caminho);
        setUsuario({...usuario, fotoPerfil: url});
    }

    return (
        <div className="hidden lg:flex flex-col col-span-1 bg-white items-center px-6 pt-6 rounded-lg shadow-md dark:bg-slate-900 dark:shadow-slate-800">
            <img 
            className="rounded-full w-30 h-30 border-2 border-white object-cover shadow-md" 
            src={usuario.fotoPerfil} 
            alt="Minha foto de perfil" /> 

            <h2 className="font-semibold text-lg mt-4 mb-4 dark:text-slate-50">{usuario.nome}</h2>
            

            <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={handleAlterarFoto}
            />
            <button 
            className="border border-blue-700 w-full rounded-md shadow-md p-2 text-blue-700 font-semibold mb-2 hover:bg-blue-700 hover:text-white transition-colors" 
            onClick={() => inputRef.current?.click()}>
                Alterar Foto
            </button>
            <p className="text-[0.7rem] font-semibold text-slate-500 mb-5 dark:text-slate-400">JPG ou PNG. Tamanho máx 5MB</p>

        </div>
    )
}