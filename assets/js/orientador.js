const URL_ESTAGIOS = import.meta.env.VITE_URL_JSON_ESTAGIOS;
const URL_USUARIOS = import.meta.env.VITE_URL_JSON_USUARIOS;

async function carregar_alunos() {
    const busca = await fetch(URL_USUARIOS);
    const lista_usuarios = await busca.json();
    const usuario_logado = lista_usuarios.find((user) => user["email"] === sessionStorage.getItem("EmailUsuario"));
    const meu_id = usuario_logado ? usuario_logado["id"] : null;


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
    <h3>${nome_aluno}</h3>
    <p>${email_aluno}</p>
    <p>🏢 ${estagio["empresa"]}</p>
    <p>📅 ${estagio["data_inicio"]}</p>
  </div>`;
    container.appendChild(card);
  });
}
carregar_alunos();
