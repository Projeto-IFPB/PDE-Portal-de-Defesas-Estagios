"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabaseBrowser as supabase } from "@/lib/supabase/browserClient";
import {
  obterCaminhoFotoPerfil,
  obterUrlPublicaFotoPerfil,
} from "@/lib/supabase/functions-select";

export type PerfilUsuario = "aluno" | "orientador" | "coordenador";

interface UsuarioMock {
  id: string;
  nome: string; // Usado para menus e saudações (Ex: "Petrônio")
  nomeCompleto: string; // Usado para o formulário de edição
  email: string; // Usado para o formulário de edição
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
    id: "",
    nome: "Carregando...",
    nomeCompleto: "Carregando...",
    email: "",
    perfil: "aluno",
    fotoPerfil: undefined,
    dataCadastro: "---",
  });

  useEffect(() => {
    async function sincronizarUsuario() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          const userId = session.user.id;

          const { data: perfilDB, error } = await supabase
            .from("Usuarios")
            .select("Nome_Completo, Email, tipo_de_perfil, data_cadastro, created_at")
            .eq("id", userId)
            .single();

          if (error) throw error;

          if (perfilDB) {
            const primeiroNome = perfilDB.Nome_Completo
              ? perfilDB.Nome_Completo.trim().split(" ")[0]
              : "Usuário"; 

            const caminho = await obterCaminhoFotoPerfil(userId);
            const url = await obterUrlPublicaFotoPerfil(caminho);
            const foto_padrao = await obterUrlPublicaFotoPerfil(
              "sem_foto_perfil.jpg",
            );
            const fotoFinal = url && url !== "sem imagem" ? url : foto_padrao;

            // Atualiza o estado com todos os dados necessários
            setUsuario({
              id: userId,
              nome: primeiroNome,
              nomeCompleto: perfilDB.Nome_Completo || "",
              email: perfilDB.Email || session.user.email || "",
              perfil: (perfilDB.tipo_de_perfil as PerfilUsuario) || "aluno",
              fotoPerfil: fotoFinal,
              dataCadastro: perfilDB.data_cadastro
            });
          }
        }
      } catch (err) {
        console.error("Erro ao sincronizar autenticação:", err);
      }
    }

    sincronizarUsuario();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
