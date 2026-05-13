import { renderizarDashboardInformativo, dados_estatisticos_orientador, carregar_alunos } from '../../components/functions.js';
import { injetarCabecalho } from '../../components/cabecalho.js';

const URL_ESTAGIOS = import.meta.env.VITE_URL_JSON_ESTAGIOS;
const URL_USUARIOS = import.meta.env.VITE_URL_JSON_USUARIOS;

// Importando a função do componente para o header
injetarCabecalho()

const configuracaoCardsInformativos = [
    { titulo: "Total de Alunos",
      icone: "fa-users",
      classesCss: "card-alunos card-info-1" },

    { titulo: "Estágios ativos",
      icone: "fa-briefcase",
      classesCss: "card-estagios-ativos card-info-2" },

    { titulo: "Pendências",
      icone: "fa-calendar",
      classesCss: "card-pendencias card-info-3" },
];

async function carregar_pagina() {
  renderizarDashboardInformativo(configuracaoCardsInformativos);

  const busca = await fetch(URL_USUARIOS);
  const lista_usuarios = await busca.json();
  const usuario_logado = lista_usuarios.find((user) => user["email"] === localStorage.getItem("EmailUsuario"));
  const meu_id = usuario_logado ? usuario_logado["id"] : null;

  if (meu_id) {
    const qtd_alunos = await dados_estatisticos_orientador(meu_id, 'total_alunos_orientador');
    const qtd_estagios_ativos = await dados_estatisticos_orientador(meu_id, 'estagios_ativos_orientador');
    const qtd_pendencias = await dados_estatisticos_orientador(meu_id, 'estagios_pendentes_orientador');

    document.querySelector('.card-alunos .card-valor').textContent = qtd_alunos;
    document.querySelector('.card-estagios-ativos .card-valor').textContent = qtd_estagios_ativos;
    document.querySelector('.card-pendencias .card-valor').textContent = qtd_pendencias;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  carregar_pagina();
  carregar_alunos()
});