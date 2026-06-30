"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Importações do nosso ecossistema Supabase
import { supabase } from "@/lib/supabase/supabaseClient";
import { loginSchema, cadastroSchema, LoginFormData, CadastroFormData } from "@/lib/supabase/schemas";

export default function Home() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  // 1. CONFIGURAÇÃO DO FORMULÁRIO DE LOGIN
  const {
    register: registrarLogin,
    handleSubmit: tratarSubmitLogin,
    formState: { errors: errosLogin },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // 2. CONFIGURAÇÃO DO FORMULÁRIO DE CADASTRO
  const {
    register: registrarCadastro,
    handleSubmit: tratarSubmitCadastro,
    formState: { errors: errosCadastro },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(cadastroSchema),
  });

  // --- FUNÇÃO DE SUBMIT DO LOGIN ---
  async function noLogin(dados: LoginFormData) {
    setCarregando(true);
    setMensagemErro(null);

    try {
      // Autentica o usuário com o Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: dados.email,
        password: dados.senha,
      });

      if (authError) throw new Error("E-mail ou senha incorretos.");

      // Se a autenticação deu certo, buscamos os dados do perfil dele na tabela 'Usuarios'
      const { data: usuarioDados, error: userError } = await supabase
        .from("Usuarios")
        .select("tipo_de_perfil")
        .eq("id", authData.user.id)
        .single();

      if (userError || !usuarioDados) {
        throw new Error("Perfil de usuário não encontrado na base de dados.");
      }

      // Redirecionamento baseado no tipo de perfil cadastrado!
      const perfil = usuarioDados.tipo_de_perfil;
      if (perfil === "aluno") router.push("/aluno");
      else if (perfil === "orientador") router.push("/orientador");
      else if (perfil === "coordenador") router.push("/coordenador");
      else router.push("/pendente");

    } catch (error: any) {
      setMensagemErro(error.message || "Ocorreu um erro inesperado.");
    } finally {
      setCarregando(false);
    }
  }

  // --- FUNÇÃO DE SUBMIT DO CADASTRO ---
  async function noCadastro(dados: CadastroFormData) {
    setCarregando(true);
    setMensagemErro(null);

    try {
      // 1. Cria o usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: dados.Email,
        password: dados.senha,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Erro ao criar credenciais de acesso.");

      // 2. Insere os dados adicionais na nossa tabela pública 'Usuarios' vinculando pelo ID
      const { error: dbError } = await supabase
        .from('Usuarios')
        .update({ 
          Nome_Completo: dados.Nome_Completo, 
          tipo_de_perfil: dados.tipo_de_perfil 
        })
        .eq('id', authData.user.id);

      if (dbError) throw dbError;

      alert("Conta criada com sucesso! Faça seu login.");
      setIsLogin(true); // Joga o usuário para a tela de login

    } catch (error: any) {
      setMensagemErro(error.message || "Falha ao registrar dados do usuário.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Container Principal */}
      <div
        className={`relative z-10 flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden min-h-150 transition-all duration-700 ease-in-out ${
          !isLogin ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Lado do Formulário */}
        <div className="w-full md:w-1/2 bg-white z-10 relative overflow-hidden flex flex-col justify-center">
          
          {/* Logo */}
          <div className="flex justify-center pt-8 sm:pt-10 mb-2">
            <Image
              src="/img/preview-pde-transparente.png"
              alt="Logo PDE"
              width={260}
              height={90}
              className="object-contain"
            />
          </div>

          {/* Feedback Global de Erro */}
          {mensagemErro && (
            <div className="mx-8 sm:mx-12 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center font-medium">
              {mensagemErro}
            </div>
          )}

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
                <form onSubmit={tratarSubmitLogin(noLogin)} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      {...registrarLogin("email")}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] focus:border-transparent outline-none transition-all"
                    />
                    {errosLogin.email && <span className="text-xs text-red-500 mt-1">{errosLogin.email.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      {...registrarLogin("senha")}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] focus:border-transparent outline-none transition-all"
                    />
                    {errosLogin.senha && <span className="text-xs text-red-500 mt-1">{errosLogin.senha.message}</span>}
                  </div>
                  <button
                    type="submit"
                    disabled={carregando}
                    className="w-full mt-4 bg-[#1f499b] text-white font-bold py-3 rounded-lg hover:bg-[#163673] transition-colors shadow-lg disabled:opacity-50"
                  >
                    {carregando ? "Carregando..." : "Entrar"}
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
                <form onSubmit={tratarSubmitCadastro(noCadastro)} className="flex flex-col gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Perfil</label>
                    <select
                      {...registrarCadastro("tipo_de_perfil")}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] outline-none transition-all text-gray-700"
                    >
                      <option value="aluno">Aluno</option>
                      <option value="orientador">Professor Orientador</option>
                      <option value="coordenador">Coordenador</option>
                    </select>
                    {errosCadastro.tipo_de_perfil && <span className="text-xs text-red-500 mt-1">{errosCadastro.tipo_de_perfil.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      {...registrarCadastro("Nome_Completo")}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] outline-none transition-all"
                    />
                    {errosCadastro.Nome_Completo && <span className="text-xs text-red-500 mt-1">{errosCadastro.Nome_Completo.message}</span>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      {...registrarCadastro("Email")}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] outline-none transition-all"
                    />
                    {errosCadastro.Email && <span className="text-xs text-red-500 mt-1">{errosCadastro.Email.message}</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        {...registrarCadastro("senha")}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] outline-none transition-all"
                      />
                      {errosCadastro.senha && <span className="text-xs text-red-500 mt-1">{errosCadastro.senha.message}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        {...registrarCadastro("confirmarSenha")}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1f499b] outline-none transition-all"
                      />
                      {errosCadastro.confirmarSenha && <span className="text-xs text-red-500 mt-1">{errosCadastro.confirmarSenha.message}</span>}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={carregando}
                    className="w-full mt-2 bg-[#1f499b] text-white font-bold py-3 rounded-lg hover:bg-[#163673] transition-colors shadow-lg disabled:opacity-50"
                  >
                    {carregando ? "Carregando..." : "Cadastrar"}
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

        {/* Lado do Banner Azul */}
        <div className="hidden md:flex w-full md:w-1/2 bg-[#1f499b] text-white p-12 flex-col justify-center items-center text-center transition-all duration-500 relative overflow-hidden">
          <div className="absolute -top-12.5 -right-12.5 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-12.5 -left-12.5 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

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