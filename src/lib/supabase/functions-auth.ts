import { supabaseBrowser } from "./browserClient";

export async function logout() {
    const { error } = await supabaseBrowser.auth.signOut();
    if (error) {
        console.error("Erro ao realizar logout: ", error);
        throw error;
    }
}
