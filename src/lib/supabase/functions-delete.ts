"use server";

import { supabase } from "@/lib/supabase/supabaseClient";
import { revalidatePath } from "next/cache";

export async function deletarEstagio(idEstagio: string) {
  const { data: documentos, error: errorFetch } = await supabase
    .from("Documentos")
    .select("caminho_arquivo")
    .eq("id_estagio", idEstagio);

  if (errorFetch) throw new Error("Erro ao buscar documentos para exclusão.");

  if (documentos && documentos.length > 0) {
    const caminhosParaRemover = documentos.map((doc) => doc.caminho_arquivo);

    const { error: errorStorage } = await supabase.storage
      .from("Documentos")
      .remove(caminhosParaRemover);

    if (errorStorage) {
      console.error("Erro ao remover arquivos do Storage:", errorStorage);
      throw new Error("Falha ao excluir arquivos físicos do Storage.");
    }
  }

  await supabase.from("Documentos").delete().eq("id_estagio", idEstagio);
  const { error: errorEstagio } = await supabase
    .from("Estagios")
    .delete()
    .eq("id", idEstagio);

  if (errorEstagio) throw new Error(`Erro ao excluir estágio: ${errorEstagio.message}`);
  revalidatePath("/dashboard/alunos");
  
  return { success: true };
}