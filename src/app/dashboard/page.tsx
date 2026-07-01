"use client";

import { useAuth } from "@/contexts/AuthContext";
import DashboardAluno from "@/components/dashboard/DashboardAluno";
import DashboardOrientador from "@/components/dashboard/DashboardOrientador";
import DashboardCoordenador from "@/components/dashboard/DashboardCoordenador";

export default function Dashboard() {
  const { usuario, setUsuario } = useAuth();

  return (
    <main className="col-span-1 p-4 md:p-8 lg:col-span-4 lg:p-10">
      {usuario.perfil === 'aluno' && <DashboardAluno usuarioId={usuario.id} />}
      {usuario.perfil === 'orientador' && <DashboardOrientador usuarioId={usuario.id} />}
      {usuario.perfil === 'coordenador' && <DashboardCoordenador usuarioId={usuario.id} />}
    </main>
  );
}
