"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Container Principal */}
      <div 
        className={`relative flex flex-col-reverse md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden min-h-[600px] transition-all duration-500 ${
          !isLogin ? "md:flex-row-reverse" : ""
        }`}
      >

        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">

          <h2 className="text-2xl font-bold text-center text-gray-800">
            {isLogin ? "Área de Login" : "Área de Cadastro"}
          </h2>
        </div>

        <div className="w-full md:w-1/2 bg-[#1f499b] text-white p-8 sm:p-12 flex flex-col justify-center items-center text-center transition-all duration-500">

           <p>Painel Azul</p>
        </div>
      </div>
    </main>
  );
}
