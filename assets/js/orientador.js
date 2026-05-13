import { renderizarDashboardInformativo, dados_estatisticos_orientador } from '../../components/functions.js';

const URL_ESTAGIOS = import.meta.env.VITE_URL_JSON_ESTAGIOS;
const URL_USUARIOS = import.meta.env.VITE_URL_JSON_USUARIOS;

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
  const usuario_logado = lista_usuarios.find((user) => user["email"] === sessionStorage.getItem("EmailUsuario"));
  const meu_id = usuario_logado ? usuario_logado["id"] : null;

  if (meu_id) {
    const qtd_alunos = await dados_estatisticos_orientador(meu_id, 'total_alunos_orientador');
    const qtd_estagios_ativos = await dados_estatisticos_orientador(meu_id, 'estagios_ativos_orientador');
    const qtd_pendencias = await dados_estatisticos_orientador(meu_id, 'estagios_pendentes_orientador');

    document.querySelector('.card-alunos .card-valor').textContent = qtd_alunos;
    document.querySelector('.card-estagios-ativos .card-valor').textContent = qtd_estagios_ativos;
    document.querySelector('.card-pendencias .card-valor').textContent = qtd_pendencias;
  }

  const resposta = await fetch(URL_ESTAGIOS);
  const todos_estagios = await resposta.json();

  const estagios = todos_estagios.filter((estagio) => {
    return estagio["id_orientador"] == meu_id;
  });

  rederizar_card(estagios);
}

async function rederizar_card(lista) {
    const busca = await fetch(URL_USUARIOS);
    const lista_usuarios = await busca.json();


  const container = document.getElementById("lista-estagios");
  container.innerHTML = "";
  if (lista.length === 0) {
    container.innerHTML = "<p>Nenhum estagio encontrado</p>";
    return;
  }
  lista.forEach((estagio) => {
    const aluno = lista_usuarios.find((user) => user["id"] === estagio["id_aluno"]);
    let nome_aluno = "Não encontrado";
    let email_aluno = "";
    if (aluno) {
        nome_aluno = aluno["nome"];
        email_aluno = aluno["email"]
    }
    const [ano, mes, dia] = estagio.data_inicio.split("-");
    const data = new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR");

    const card = document.createElement("div");
    card.innerHTML = `<div class="grid-alunos">
  <div class="card-aluno">
    <div class="header-card">
      <div class="circulo">
       <i class="fa-solid fa-graduation-cap"></i>
      </div>
      <div id="status">
       <span class="status">${estagio["status"]}</span>
      </div>
    </div>
    <div class="card-info">
    <h3>${nome_aluno}</h3>
    <a href="mailto:${email_aluno}"><i class="fa-regular fa-envelope"></i> ${email_aluno} </a>
    <p><i class="fa-solid fa-hotel"></i> ${estagio["empresa"]}</p>
    <p><i class="fa-regular fa-calendar"></i> ${data}</p>
    </div>
  </div>`;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carregar_pagina();
});