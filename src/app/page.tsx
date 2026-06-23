"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div 
        className={`relative flex flex-col-reverse md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden min-h-[600px] transition-all duration-500 ${
          !isLogin ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white z-10">
          <div className="flex justify-center mb-6">
            <Image 
              src="/img/preview-pde-transparente.png" 
              alt="Logo PDE" 
              width={150} 
              height={60} 
              className="object-contain" 
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {isLogin ? "Faça seu Login" : "Crie sua Conta"}
          </h2>

          {isLogin ? (
            // --- FORMULÁRIO DE LOGIN ---
            <form className="flex flex-col gap-4 animate-in fade-in duration-500">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="text-right">
                <a href="#" className="text-sm text-[#1f499b] hover:underline font-medium">Esqueceu a senha?</a>
              </div>
              <button 
                type="button" 
                className="w-full mt-4 bg-[#1f499b] text-white font-bold py-3 rounded-lg hover:bg-[#163673] transition-colors shadow-lg"
              >
                Entrar
              </button>
            </form>
          ) : (
            // --- FORMULÁRIO DE CADASTRO ---
            <form className="flex flex-col gap-3 animate-in fade-in duration-500">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Perfil</label>
                <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] outline-none transition-all">
                  <option value="aluno">Aluno</option>
                  <option value="orientador">Professor Orientador</option>
                  <option value="coordenador">Coordenador</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input type="text" placeholder="Seu nome completo" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input type="email" placeholder="seu@email.com" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] outline-none transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] outline-none transition-all" />
                </div>
              </div>
              <button 
                type="button" 
                className="w-full mt-2 bg-[#1f499b] text-white font-bold py-3 rounded-lg hover:bg-[#163673] transition-colors shadow-lg"
              >
                Cadastrar
              </button>
            </form>
          )}
        </div>

        <div className="w-full md:w-1/2 bg-[#1f499b] text-white p-8 sm:p-12 flex flex-col justify-center items-center text-center transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

          {isLogin ? (
            <div className="z-10 animate-in fade-in zoom-in duration-500">
              <h2 className="text-3xl font-bold mb-4">Novo por aqui?</h2>
              <p className="mb-8 text-blue-100 leading-relaxed">
                Cadastre-se no Portal de Defesas de Estágio e comece a gerenciar suas atividades com facilidade.
              </p>
              <button 
                onClick={() => setIsLogin(false)}
                className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#1f499b] transition-colors duration-300"
              >
                Deseja fazer um novo cadastro? Clique aqui!
              </button>
            </div>
          ) : (
            <div className="z-10 animate-in fade-in zoom-in duration-500">
              <h2 className="text-3xl font-bold mb-4">Bem-vindo de volta!</h2>
              <p className="mb-8 text-blue-100 leading-relaxed">
                Acesse sua conta para continuar gerenciando seus estágios e orientações.
              </p>
              <button 
                onClick={() => setIsLogin(true)}
                className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-[#1f499b] transition-colors duration-300"
              >
                Já possui uma conta? Faça login clicando aqui!
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
