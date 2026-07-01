'use client';

import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { atualizarDadosUsuario } from "@/lib/supabase/perfil";
import { Pencil, Mail, Lock } from 'lucide-react'; 

export default function CardEditarPerfil() {
  const { usuario, setUsuario } = useAuth();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  // Preenche os campos assim que o usuário carregar do contexto
  useEffect(() => {
    if (usuario) {
      setNome(usuario.nomeCompleto || '');
      setEmail(usuario.email || '');       
    }
  }, [usuario]);

  const handleDescartar = () => {
    setNome(usuario?.nomeCompleto || '');
    setEmail(usuario?.email || '');
    setSenha('');
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Proteção caso o usuário não tenha carregado ainda
    if (!usuario) return;

    setLoading(true);

    // Passamos o usuario.id como primeiro parâmetro
    const resultado = await atualizarDadosUsuario(usuario.id, nome, email, senha);

    if (resultado.sucesso) {
      alert("Perfil atualizado com sucesso!");
      // Atualiza o contexto corretamente com o nome completo
      setUsuario({ 
        ...usuario, 
        nomeCompleto: nome, 
        nome: nome.trim().split(' ')[0], // Atualiza também o primeiro nome pros menus
        email: email 
      });
      setSenha('');
    } else {
      alert("Erro ao atualizar: " + resultado.erro);
    }
    
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl dark:bg-slate-900 shadow-sm border border-gray-100 p-6 sm:p-8">
      <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-6">Informações Pessoais</h2>
      
      <form onSubmit={handleSalvar} className="space-y-5">
        
        {/* Campo Nome */}
        <div>
          <label className="block text-sm font-medium dark:text-white text-gray-600 mb-1">Nome Completo</label>
          <div className="relative">
            <input 
              type="text" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:text-white outline-none transition-all text-gray-700"
              placeholder="Seu nome completo"
            />
            <Pencil className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Campo E-mail */}
        <div>
          <label className="block text-sm font-medium dark:text-white text-gray-600 mb-1">E-mail</label>
          <div className="relative">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:text-white outline-none transition-all text-gray-700"
              placeholder="seu.email@exemplo.com"
            />
            <Mail className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Campo Senha */}
        <div>
          <label className="block text-sm font-medium dark:text-white text-gray-600 mb-1">Senha</label>
          <div className="relative">
            <input 
              type="password" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:text-white outline-none transition-all text-gray-700"
              placeholder="••••••••••"
            />
            <Lock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          <p className="text-xs dark:text-white text-gray-400 mt-1">Preencha apenas se desejar alterar sua senha atual.</p>
        </div>

        {/* Botões (Flex-col no Mobile, Flex-row no Desktop) */}
        <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4">
          <button 
            type="button" 
            onClick={handleDescartar}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Descartar
          </button>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex justify-center items-center"
          >
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}