"use client";

import DashboardOutlineIcon from "@iconify-react/material-symbols/dashboard-outline";
import CalendarMonthOutlineIcon from "@iconify-react/material-symbols/calendar-month-outline";
import PeoplesIcon from "@iconify-react/icon-park-outline/peoples";
import PeopleIcon from "@iconify-react/icon-park-outline/people";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

function NavLinkItem({
  href,
  icon,
  label,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 p-2 rounded-md ${isActive ? "bg-gray-200 text-blue-600 dark:bg-slate-800/50 dark:border-l-4 dark:border-blue-500 dark:text-blue-400" : "text-gray-700 hover:bg-gray-200 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-blue-400"}`}
    >
      {icon}
      <h3>{label}</h3>
    </Link>
  );
}

export default function Aside() {
  const { usuario } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (!pathname) return false;

    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(path);
  };

  return (
    <aside className="hidden md:block col-span-1 h-screen bg-gray-50 px-4 pt-3 sticky top-0 z-40 shadow-sm  dark:bg-slate-950 dark:shadow-slate-800">
      <h1 className="text-blue-700 font-bold -mb-1">PDE</h1>
      <p className="text-[0.7rem] font-medium text-gray-600 mb-6 dark:text-slate-50">
        Portal do{" "}
        {usuario.perfil === "aluno"
          ? "Aluno"
          : usuario.perfil === "orientador"
            ? "Orientador"
            : "Coordenador"}
      </p>

      <nav className="font-medium text-sm mx-1 space-y-2">
        <NavLinkItem
          href={"/dashboard"}
          icon={<DashboardOutlineIcon className="w-4 h-4" />}
          label={"Início"}
          isActive={isActive("/dashboard")}
        />

        <NavLinkItem
          href={usuario.perfil === "aluno" ? "/dashboard/bancas" : "/dashboard/alunos"}
          icon={<PeoplesIcon className="w-4 h-4" />}
          label={usuario.perfil === "aluno" ? "Bancas" : "Alunos"}
          isActive={
            isActive("/dashboard/bancas") || isActive("/dashboard/alunos")
          }
        />

        <NavLinkItem
          href={"/dashboard/calendario"}
          icon={<CalendarMonthOutlineIcon className="w-4 h-4" />}
          label={"Calendário"}
          isActive={isActive("/dashboard/calendario")}
        />

        <NavLinkItem
          href={"/dashboard/perfil"}
          icon={<PeopleIcon className="w-4 h-4" />}
          label={"Perfil"}
          isActive={isActive("/dashboard/perfil")}
        />
      </nav>
    </aside>
  );
}