import { supabase } from "./supabaseClient";

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Erro ao realizar logout: ", error);
        throw error;
    }
}
