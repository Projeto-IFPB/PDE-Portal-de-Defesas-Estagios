import { Camera } from "lucide-react";

interface CardAlterarImagemPerfilProps {
    nome: string,
    srcImagem: string,
    dataCadastro?: string,
}

export function CardAlterarImagemPerfilMobile(props: CardAlterarImagemPerfilProps) {
    return (
        <div className="lg:hidden foto flex flex-col items-center mb-2">
            <div className="relative w-24 h-24">
            <img 
            className="rounded-full w-full h-full border-2 border-white object-cover shadow-md" 
            src={props.srcImagem} 
            alt="Minha foto de perfil" /> 
            <div className="icone_camera absolute bottom-0 right-0 bg-blue-700 p-2 rounded-full shadow-md">
                <Camera className="text-white font-bold w-4 h-4" strokeWidth={2.5} />
            </div>
            </div>

            <h2 className="font-semibold text-lg text-center">{props.nome}</h2>
        </div>
    )
}

export function CardAlterarImagemPerfilDesktop(props: CardAlterarImagemPerfilProps) {
    return (
        <div className="hidden lg:flex flex-col col-span-1 bg-white items-center px-6 pt-6 rounded-lg shadow-md">
          <img 
          className="rounded-full w-30 h-30 border-2 border-white object-cover shadow-md" 
          src={props.srcImagem} 
          alt="Minha foto de perfil" /> 

          <h2 className="font-semibold text-lg mt-4">{props.nome}</h2>
          <p className="text-[0.7rem] font-semibold text-slate-500 mb-5">Mesmo desde Jun 2026</p>

          <button className="border border-blue-700 w-full rounded-md shadow-md p-2 text-blue-700 font-semibold mb-2 hover:bg-blue-700 hover:text-white transition-colors" >Alterar Foto</button>
          <p className="text-[0.7rem] font-semibold text-slate-500 mb-5">{'Membro desde ' + props.dataCadastro}</p>

        </div>
    )
}