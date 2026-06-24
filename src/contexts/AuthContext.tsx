'use client';

import { obterCaminhoFotoPerfil, obterUrlPublicaFotoPerfil } from '@/lib/supabase/functions-select';
import { useEffect } from 'react';
import { createContext, useContext, useState, ReactNode } from 'react';

export type PerfilUsuario = 'aluno' | 'orientador' | 'coordenador';

interface UsuarioMock {
  id: string;
  nome: string;
  perfil: PerfilUsuario;
  fotoPerfil:string | undefined;
  dataCadastro:string;
}

interface AuthContextType {
  usuario: UsuarioMock;
  setUsuario: (usuario: UsuarioMock) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Estado inicial simulado. 
  // No futuro, isso será substituído pela resposta de login do Supabase.
  const [usuario, setUsuario] = useState<UsuarioMock>({
    id: 'c72ed7b0-beb7-4d52-9ccd-677deb32c348',
    nome: 'Manoel Gomes', 
    perfil: 'aluno',
    fotoPerfil: undefined,
    dataCadastro: 'Jun 2026',          
  });

  useEffect(() => {
    async function carregarFotoPerfil() {
    const caminho = await obterCaminhoFotoPerfil(usuario.id);
    const url = await obterUrlPublicaFotoPerfil(caminho);
    const foto_padrao = await obterUrlPublicaFotoPerfil("sem_foto_perfil.jpg")
    if (url && url !== 'sem imagem') {
        setUsuario({...usuario, fotoPerfil: url });
    }
    else {
      setUsuario({...usuario, fotoPerfil: foto_padrao})
    }
    }
    carregarFotoPerfil();
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