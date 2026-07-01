import { PerfilUsuario } from "@/contexts/AuthContext";

interface CardInformacoesPerfilProps {
    dataCadastro: string;
    perfil: PerfilUsuario;
}

export default function CardInformacoesPerfil({
  dataCadastro,
  perfil,  
}: CardInformacoesPerfilProps) {

    const perfilFormatado = {
        aluno: "Aluno",
        orientador: "Orientador",
        coordenador: "Coordenador",
    }[perfil];

    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:gap-4">

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm dark:shadow-slate-800 border border-gray-200 dark:border-slate-800 p-5">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Cadastrado desde
                </p>

                <h2 className="text-xl font-semibold dark:text-white">
                    {dataCadastro}
                </h2>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md dark:shadow-slate-800 border border-gray-200 dark:border-slate-800 p-5">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Perfil
                </p>

                <h2 className="text-xl font-semibold dark:text-white">
                    {perfilFormatado}
                </h2>
            </div>
        </div>
    )
}