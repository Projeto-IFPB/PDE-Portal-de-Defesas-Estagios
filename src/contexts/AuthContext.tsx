'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type PerfilUsuario = 'aluno' | 'orientador' | 'coordenador';

interface UsuarioMock {
  id: string;
  nome: string;
  perfil: PerfilUsuario;
  fotoPerfil:string;
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
    fotoPerfil: 'sem foto',
    dataCadastro: 'Jun 2026',          
  });

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