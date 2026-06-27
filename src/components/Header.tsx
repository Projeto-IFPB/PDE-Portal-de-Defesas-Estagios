"use client";

import NotificationsOutlineIcon from "@iconify-react/material-symbols/notifications-outline";
import DarkModeOutlineIcon from "@iconify-react/material-symbols/dark-mode-outline";
import LightModeOutlineIcon from '@iconify-react/material-symbols/light-mode-outline';
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const { usuario } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="hidden md:flex sticky top-0 z-30 items-center justify-end gap-4 h-16 px-6 bg-white w-full dark:bg-slate-900">
      <button
        className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer dark:hover:bg-slate-700"
        aria-label="Notificações"
      >
        <NotificationsOutlineIcon className="w-5 h-5 text-gray-600 hover:text-blue-700" />
      </button>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer dark:hover:bg-slate-700"
        aria-label="Alternar tema"
      >
        {theme === "dark" ? (
          <DarkModeOutlineIcon className="w-5 h-5 text-gray-600 hover:text-blue-700" />
        ) : (
          <LightModeOutlineIcon className="w-5 h-5 text-gray-600 hover:text-blue-700" />
        )}
      </button>

      <div className="text-right border-l border-gray-300 pl-4">
        <p className="font-semibold text-sm whitespace-nowrap dark:text-slate-50">
          {" "}
          {usuario.nome}
        </p>
        <p className="text-xs text-gray-500 capitalize">{usuario.perfil}</p>
      </div>

      <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden">
        {usuario.fotoPerfil && (
          <img
            src={usuario.fotoPerfil}
            alt={usuario.nome}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </header>
  );
}
