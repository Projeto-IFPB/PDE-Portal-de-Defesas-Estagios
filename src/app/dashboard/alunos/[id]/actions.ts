'use server';

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase/supabaseClient"; 

export async function aprovarEstagioAction(estagioId: string) {
  const { error } = await supabase
    .from("Estagios") 
    .update({ status: "em_andamento" })
    .eq("id", estagioId); 

  if (error) {
    throw new Error(`Erro ao atualizar status: ${error.message}`);
  }
  revalidatePath(`/dashboard/alunos/${estagioId}`);
}