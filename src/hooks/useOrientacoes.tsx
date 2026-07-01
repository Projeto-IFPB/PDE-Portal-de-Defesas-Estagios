// useOrientacoes.ts
import {listarEstagiosPorOrientadorId, buscarUsuarioPorId, obterCaminhoFotoPerfil, obterUrlPublicaFotoPerfil } from '@/lib/supabase/functions-select'
import { useState, useEffect } from 'react';
import { Estagio } from '@/lib/supabase/interfaces'
import { useAuth } from '@/contexts/AuthContext';


//coloquei um id provisorio so para testar, quando colocarmos o login vamos puxar pelo id no local-storage
export const useOrientacoes = () => {
    const { usuario } = useAuth();
    const [orientacoes, setOrientacoes ] = useState<Estagio[]>([])
    useEffect(() => {
      async function carregarOrientacoes() {
        const estagios = await listarEstagiosPorOrientadorId(usuario.id);
        if (estagios) {
          const estagiosComAluno = await Promise.all(estagios.map(async (estagio) => {
            const usuario = await buscarUsuarioPorId(estagio.Id_estagiario);
            const caminhoFoto = await obterCaminhoFotoPerfil(estagio.Id_estagiario);
  
            
            let fotoUrl = await obterUrlPublicaFotoPerfil(caminhoFoto);
            
  
            return {
              ...estagio,
              nome_estagiario: usuario?.["Nome_Completo"] || "Aluno Não Encontrado",
              email_estagiario: usuario?.Email || "Email não encontrado",
              foto_estagiario: fotoUrl
            };
          }));
          setOrientacoes(estagiosComAluno);
        }
      }
      carregarOrientacoes();
    }, []);
   return { orientacoes, setOrientacoes };
  }