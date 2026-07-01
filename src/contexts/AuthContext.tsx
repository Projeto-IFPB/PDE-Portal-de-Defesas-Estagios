'use client';

import { useEffect, createContext, useContext, useState, ReactNode } from 'react';
import { obterCaminhoFotoPerfil, obterUrlPublicaFotoPerfil } from '@/lib/supabase/functions-select';
import { supabase } from '@/lib/supabase/supabaseClient'; 

export type PerfilUsuario = 'aluno' | 'orientador' | 'coordenador';

interface UsuarioMock {
  id: string;
  nome: string;
  perfil: PerfilUsuario;
  fotoPerfil: string | undefined;
  dataCadastro: string;
}

interface AuthContextType {
  usuario: UsuarioMock; 
  setUsuario: (usuario: UsuarioMock) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioMock>({
    id: '',
    nome: 'Carregando...',
    perfil: 'aluno', // Perfil padrão temporário de segurança
    fotoPerfil: undefined,
    dataCadastro: '---',
  });

  useEffect(() => {
    async function sincronizarUsuario() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const userId = session.user.id;

          const { data: perfilDB, error } = await supabase
            .from('Usuarios')
            .select('Nome_Completo, tipo_de_perfil, data_cadastro')
            .eq('id', userId)
            .single();

          if (error) throw error;

          if (perfilDB) {
            const primeiroNome = perfilDB.Nome_Completo 
              ? perfilDB.Nome_Completo.trim().split(' ')[0] 
              : 'Usuário';

            let dataCadastroFormatada = '---';
            if (perfilDB.data_cadastro) {
              const dataObj = new Date(`${perfilDB.data_cadastro}T00:00:00`);
              const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
              dataCadastroFormatada = `${meses[dataObj.getMonth()]} ${dataObj.getFullYear()}`;
            }

            const caminho = await obterCaminhoFotoPerfil(userId);
            const url = await obterUrlPublicaFotoPerfil(caminho);
            const foto_padrao = await obterUrlPublicaFotoPerfil("sem_foto_perfil.jpg");
            const fotoFinal = (url && url !== 'sem imagem') ? url : foto_padrao;

            // 2. Substitui o placeholder pelos dados reais
            setUsuario({
              id: userId,
              nome: primeiroNome,
              perfil: (perfilDB.tipo_de_perfil as PerfilUsuario) || 'aluno',
              fotoPerfil: fotoFinal,
              dataCadastro: dataCadastroFormatada,
            });
          }
        }
      } catch (err) {
        console.error("Erro ao sincronizar autenticação:", err);
      }
    }

    sincronizarUsuario();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Atualiza os dados novamente caso o usuário faça login em outra conta
      if (session) {
        sincronizarUsuario();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
