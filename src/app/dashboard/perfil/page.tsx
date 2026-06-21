import { Camera } from "lucide-react";
import { CardAlterarImagemPerfilDesktop, CardAlterarImagemPerfilMobile } from "@/components/CardAlterarImagemPerfil";

export default function Dashboard() {
  return (
    <>
    <main className="col-span-4 p-6">
    {/* Todo o conteúdo da página deve ficar aqui */}
      <section className="alterar_foto grid grid-cols-1 lg:grid-cols-4">

        <CardAlterarImagemPerfilMobile nome={'Ryan'} srcImagem="https://storyblok-cdn.photoroom.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp" />

        <CardAlterarImagemPerfilDesktop nome={'Ryan'} srcImagem="https://storyblok-cdn.photoroom.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp" dataCadastro="Jun 2026" />
      </section>
      
    </main>
    </>
    );
}