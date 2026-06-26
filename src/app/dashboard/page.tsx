"use client";

import { useAuth } from "@/contexts/AuthContext";
import DashboardAluno from "@/components/dashboard/DashboardAluno";
import DashboardOrientador from "@/components/dashboard/DashboardOrientador";
import DashboardCoordenador from "@/components/dashboard/DashboardCoordenador";

export default function Dashboard() {
  const { usuario, setUsuario } = useAuth();

  return (
    <main className="col-span-1 p-4 md:p-8 lg:col-span-4 lg:p-10">

      <div className="mb-8 flex gap-2 rounded-lg bg-white p-2 shadow-sm w-fit border border-gray-200">
        <button
          onClick={() => setUsuario({ ...usuario, perfil: "aluno" })}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${usuario.perfil === "aluno" ? "bg-[#185adb] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
        >
          Aluno
        </button>
        <button
          onClick={() => setUsuario({ ...usuario, perfil: "orientador" })}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${usuario.perfil === "orientador" ? "bg-[#185adb] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
        >
          Orientador
        </button>
        <button
          onClick={() => setUsuario({ ...usuario, perfil: "coordenador" })}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${usuario.perfil === "coordenador" ? "bg-[#185adb] text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
        >
          Coordenador
        </button>
      </div>

      {usuario.perfil === 'aluno' && <DashboardAluno usuarioId={usuario.id} />}
      {usuario.perfil === 'orientador' && <DashboardOrientador usuarioId={usuario.id} />}
      {usuario.perfil === 'coordenador' && <DashboardCoordenador usuarioId={usuario.id} />}
      
    </main>
  );
}
