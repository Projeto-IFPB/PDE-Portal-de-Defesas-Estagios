import { renderizarDashboardInformativo, total_alunos, estagios_em_orientacao, pedidos_pendentes } from '../../components/functions.js';

const URL_ESTAGIOS = import.meta.env.VITE_URL_JSON_ESTAGIOS;
const URL_USUARIOS = import.meta.env.VITE_URL_JSON_USUARIOS;

// Importando a função do componente para o header
import { injetarCabecalho } from '../../components/cabecalho.js';
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
  const usuario_logado = lista_usuarios.find((user) => user["email"] === sessionStorage.getItem("EmailUsuario"));
  const meu_id = usuario_logado ? usuario_logado["id"] : null;

  if (meu_id) {
    const qtd_alunos = await total_alunos(meu_id);
    const qtd_estagios_ativos = await estagios_em_orientacao(meu_id);
    const qtd_pendencias = await pedidos_pendentes(meu_id);

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
  
    // ... dentro do carregar_pagina ...
  lista.forEach((estagio) => {
      const aluno = lista_usuarios.find((user) => user["id"] === estagio["id_aluno"]);
      let nome_aluno = "Não encontrado";
      let email_aluno = "";
      
      if (aluno) {
          nome_aluno = aluno["nome"];
          email_aluno = aluno["email"];
      }

      const [ano, mes, dia] = estagio.data_inicio.split("-");
      const dataFormatada = `${dia}/${mes}/${ano}`;

      const card = document.createElement("div");
      card.className = "card-aluno"; 
      
      card.innerHTML = `
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
              <p>${email_aluno}</p>
              <p><strong>Início:</strong> ${estagio.data_inicio}</p>
          </div>
      `;

      card.addEventListener('click', () => {
          abrirModalDetalhes(nome_aluno, email_aluno, estagio.empresa, estagio.curso_aluno, estagio.data_inicio, estagio.status);
      });

      container.appendChild(card);
  });

  // Função para abrir e preencher o modal
  function abrirModalDetalhes(nome, email, empresa, curso, data, status) {
      const modal = document.getElementById('modal-detalhes');
      
      // Preenche os campos
      document.getElementById('detalhe-nome').textContent = nome;
      document.getElementById('detalhe-email').textContent = email || "Não informado";
      document.getElementById('detalhe-empresa').textContent = empresa || "Não informado";
      document.getElementById('detalhe-curso').textContent = curso || "Não informado"; 
      document.getElementById('detalhe-data').textContent = data;
      document.getElementById('detalhe-status').textContent = status;
      
      // Mostra o modal
      modal.classList.add('ativo');
  }

  // Lógica para fechar o modal
  document.getElementById('fechar-modal-detalhes').addEventListener('click', () => {
      document.getElementById('modal-detalhes').classList.remove('ativo');
  });

  // Fechar ao clicar fora do modal
  window.addEventListener('click', (event) => {
      const modal = document.getElementById('modal-detalhes');
      if (event.target === modal) {
          modal.classList.remove('ativo');
      }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carregar_pagina();
});