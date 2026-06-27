"use client";

import DarkModeOutlineIcon from "@iconify-react/material-symbols/dark-mode-outline";
import LightModeOutlineIcon from "@iconify-react/material-symbols/light-mode-outline";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function HeaderMobile() {
  const { usuario } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="flex md:hidden sticky top-0 z-30 items-center justify-between h-16 px-4 bg-white dark:bg-slate-900">
      <h1 className="font-bold text-blue-700">PDE</h1>

      <div className="flex items-center gap-3">
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer dark:hover:bg-slate-700"
          aria-label="Alternar tema"
        >
          {theme === "dark" ? (
            <DarkModeOutlineIcon className="w-5 h-5 text-gray-600 hover:text-blue-700 dark:text-blue-700" />
          ) : (
            <LightModeOutlineIcon className="w-5 h-5 text-yellow-600" />
          )}
        </button>

        <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden">
          {usuario.fotoPerfil && (
            <img
              src={usuario.fotoPerfil}
              alt={usuario.nome}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </header>
  );
}
