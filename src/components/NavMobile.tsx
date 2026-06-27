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
      className={`flex flex-col items-center px-4 py-2 rounded-full transition-colors duration-300 ${isActive ? "bg-gray-200 text-blue-700 dark:bg-slate-700 dark:text-blue-600" : "dark:text-blue-600/50 dark:hover:bg-slate-700 dark:hover:text-blue-600"}`}
    >
      {icon}
      <h3 className={`text-[0.6rem] ${isActive ? "block" : "hidden"}`}>
        {label}
      </h3>
    </Link>
  );
}

export default function NavMobile() {
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
    <nav className="flex fixed md:hidden bottom-0 left-0 right-0 justify-around items-center w-screen bg-gray-50 z-50 h-16 border-t border-gray-200 shadow-l pb-[env(safe-area-inset-bottom)] dark:bg-slate-950 dark:shadow-slate-800">
      <NavLinkItem
        href={"/dashboard"}
        icon={<DashboardOutlineIcon className="w-4 h-4" />}
        label={"Início"}
        isActive={isActive("/dashboard")}
      />

      <NavLinkItem
        href={
          usuario.perfil === "aluno" ? "/dashboard/bancas" : "/dashboard/alunos"
        }
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
  );
}