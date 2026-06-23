"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    // Fundo com imagem corporativa e overlay embaçado
    <main className="relative min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center">
      {/* Máscara preta translúcida e desfoque */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Container Principal */}
      <div 
        className={`relative z-10 flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden min-h-[600px] transition-all duration-700 ease-in-out ${
          !isLogin ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Lado do Formulário (Ocupa 100% no Mobile, 50% no Desktop) */}
        <div className="w-full md:w-1/2 bg-white z-10 relative overflow-hidden flex flex-col justify-center">
          
          {/* Logo Maior e Imponente */}
          <div className="flex justify-center pt-8 sm:pt-10 mb-2">
            <Image 
              src="/img/preview-pde-transparente.png" 
              alt="Logo PDE" 
              width={260} 
              height={90} 
              className="object-contain" 
            />
          </div>

          {/* Carrossel Deslizante dos Formulários */}
          <div className="relative w-full overflow-hidden flex-1">
            <div 
              className={`flex w-[200%] h-full transition-transform duration-500 ease-in-out ${
                isLogin ? "translate-x-0" : "-translate-x-1/2"
              }`}
            >
              
              {/* --- TELA DE LOGIN --- */}
              <div className="w-1/2 px-8 pb-8 sm:px-12 sm:pb-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                  Faça seu Login
                </h2>
                <form className="flex flex-col gap-4">
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
                  <button 
                    type="button" 
                    className="w-full mt-4 bg-[#1f499b] text-white font-bold py-3 rounded-lg hover:bg-[#163673] transition-colors shadow-lg"
                  >
                    Entrar
                  </button>
                </form>

                {/* Texto de Alternância (APENAS MOBILE) */}
                <p className="mt-8 text-center text-sm text-gray-600 md:hidden">
                  Não tem uma conta?{" "}
                  <button 
                    onClick={() => setIsLogin(false)}
                    className="text-[#1f499b] font-bold hover:underline"
                  >
                    Cadastre-se
                  </button>
                </p>
              </div>

              {/* --- TELA DE CADASTRO --- */}
              <div className="w-1/2 px-8 pb-8 sm:px-12 sm:pb-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                  Crie sua Conta
                </h2>
                <form className="flex flex-col gap-3">
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

                {/* Texto de Alternância (APENAS MOBILE) */}
                <p className="mt-6 text-center text-sm text-gray-600 md:hidden">
                  Já possui uma conta?{" "}
                  <button 
                    onClick={() => setIsLogin(true)}
                    className="text-[#1f499b] font-bold hover:underline"
                  >
                    Faça login
                  </button>
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Lado do Banner Azul (Oculto no Mobile, Ocupa 50% no Desktop) */}
        <div className="hidden md:flex w-full md:w-1/2 bg-[#1f499b] text-white p-12 flex-col justify-center items-center text-center transition-all duration-500 relative overflow-hidden">
          
          <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

          {/* O React re-renderiza essa parte baseada no estado */}
          <div className="z-10 transition-opacity duration-500">
            {isLogin ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
