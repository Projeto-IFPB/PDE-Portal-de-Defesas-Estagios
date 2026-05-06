const URL_ESTAGIOS = import.meta.env.VITE_URL_JSON_ESTAGIOS;
const URL_USUARIOS = import.meta.env.VITE_URL_JSON_USUARIOS;

const mostrarMensagem = (texto, tipo = "erro") => {
  const mensagem = document.getElementById("mensagem-estagio");
  if (!mensagem) return;
  mensagem.textContent = texto;
  mensagem.classList.remove("oculto", "sucesso", "erro");
  mensagem.classList.add(tipo === "sucesso" ? "sucesso" : "erro");

  if (mensagem.dataset.timeoutId) {
    window.clearTimeout(mensagem.dataset.timeoutId);
  }

  const timeoutId = window.setTimeout(() => {
    mensagem.classList.add("oculto");
  }, 5000);

  mensagem.dataset.timeoutId = timeoutId;
};

const lerArquivoComoBase64 = (arquivo) => {
  return new Promise((resolve, reject) => {
    if (!arquivo) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Falha ao ler o arquivo"));
    reader.readAsDataURL(arquivo);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const abrirModal = document.getElementById("abrir-modal-estagio");
  const overlay = document.getElementById("modal-overlay");
  const fecharModal = document.getElementById("fechar-modal-estagio");
  const botaoCancelar = document.querySelector(".botao-cancelar");
  const formulario = document.getElementById("formulario-estagio");

  const abrir = () => {
    overlay.classList.add("ativo");
    document.body.style.overflow = "hidden";
  };

  const fechar = () => {
    overlay.classList.remove("ativo");
    document.body.style.overflow = "";
  };

  if (abrirModal) {
    abrirModal.addEventListener("click", abrir);
  }

  if (fecharModal) {
    fecharModal.addEventListener("click", fechar);
  }

  if (botaoCancelar) {
    botaoCancelar.addEventListener("click", fechar);
  }

  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        fechar();
      }
    });
  }

  if (formulario) {
    formulario.addEventListener("submit", async (event) => {
      event.preventDefault();

      const empresa = formulario.querySelector("[name=empresa]").value.trim();
      const dataInicio = formulario.querySelector("[name=dataInicio]").value;
      const nomeOrientador = formulario
        .querySelector("[name=nomeOrientador]")
        .value.trim();
      const cursoEstagiario = formulario
        .querySelector("[name=cursoEstagiario]")
        .value.trim();
      const emailCoordenador = formulario
        .querySelector("[name=emailCoordenador]")
        .value.trim();
      const termoCompromisso = formulario.querySelector(
        "[name=termoCompromisso]"
      ).files[0];
      const termoOrientacao = formulario.querySelector("[name=termoOrientacao]")
        .files[0];
      const botaoEnviar = formulario.querySelector("button[type=submit]");

      if (
        !empresa ||
        !dataInicio ||
        !nomeOrientador ||
        !cursoEstagiario ||
        !emailCoordenador ||
        !termoCompromisso ||
        !termoOrientacao
      ) {
        mostrarMensagem("Preencha todos os campos obrigatórios.", "erro");
        return;
      }

      botaoEnviar.disabled = true;
      const textoOriginal = botaoEnviar.innerText;
      botaoEnviar.innerText = "Enviando...";

      try {
        const busca = await fetch(URL_USUARIOS);
        const lista_usuarios = await busca.json();
        const orientador = lista_usuarios.find((user) => user["nome"] === nomeOrientador);
        if (orientador) {
          const id_orientador = orientador["id"];
        } else {
          mostrarMensagem("Não foi possivel encontrar esse orientador.","erro");
        }
        const aluno = lista_usuarios.find(
          (user) => user["email"] === sessionStorage.getItem("EmailUsuario"));
        const id_aluno = aluno["id"];

        const coordenador = lista_usuarios.find((user) => user["email"] === emailCoordenador);
        if (coordenador) {
          const id_coordenador = {
            coordenador: coordenador["id"],
          };
          const id_banca_exaninadora = [];
          id_banca_exaninadora.push(id_coordenador);
        } else{
          mostrarMensagem("Não foi possivel o coordenador.","erro");
        }

        const status = "em andamento";

        const [compBase64, oriBase64] = await Promise.all([
          lerArquivoComoBase64(termoCompromisso),
          lerArquivoComoBase64(termoOrientacao),
        ]);

        const payload = {
          empresa: empresa,
          curso_aluno: cursoEstagiario,
          data_inicio: dataInicio,
          id_aluno: id_aluno,
          id_orientador: id_orientador,
          id_banca_examinadora: id_banca_exaninadora,
          status: status,
          termo_compromisso: {
            fileName: termoCompromisso.name,
            fileType: termoCompromisso.type,
            fileSize: termoCompromisso.size,
            path: `files/termo-compromisso/${termoCompromisso.name}`,
            content: compBase64,
          },
          termo_orientacao: {
            fileName: termoOrientacao.name,
            fileType: termoOrientacao.type,
            fileSize: termoOrientacao.size,
            path: `files/termo-orientacao/${termoOrientacao.name}`,
            content: oriBase64,
          },
        };

        const resposta = await fetch(URL_ESTAGIOS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (resposta.ok) {
          mostrarMensagem("Estágio cadastrado com sucesso!", "sucesso");
          formulario.reset();
          fechar();
        } else {
          mostrarMensagem("Não foi possível cadastrar o estágio.", "erro");
        }
      } catch (erro) {
        console.error("Erro ao enviar cadastro de estágio:", erro);
        mostrarMensagem("Erro ao enviar o cadastro do estágio.", "erro");
      } finally {
        botaoEnviar.disabled = false;
        botaoEnviar.innerText = textoOriginal;
      }
    });
  }
});

const containerEstagios = document.getElementById("container-meus-estagios");

async function renderizarEstagios(dados) {
  const busca = await fetch(URL_USUARIOS);
  const lista_usuarios = await busca.json();

  const emailLogado = sessionStorage.getItem("EmailUsuario");

  const usuarioLogado = lista_usuarios.find((user) => user["email"] === emailLogado);
  const meuId = usuarioLogado ? usuarioLogado.id : null;


  const estagiosDoAluno = dados.filter((estagio) => estagio.id_aluno == meuId);
  
  //se não houver nenhum estágio ainda exibe isso
  if (dados.length === 0) {
    containerEstagios.innerHTML = `
    <div class="mensagem-vazia">
      <i class="fa-solid fa-folder-open"></i>
      <p>Você ainda não possui estagios cadastrados.</p>
    </div>`;
    return;
  }
  //percorre os dados salvos na API e retorna estrutura completa html com os dados da API
  containerEstagios.innerHTML = estagiosDoAluno
    .map((estagio) => {

      const orientador = lista_usuarios.find((user) => user["id"] === estagio.id_orientador);
      const nome_orientador = orientador ? orientador["nome"] : "Não Cadastrado";
      //formatação da data
      const [ano, mes, dia] = estagio.data_inicio.split("-");
      const data = new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR");
      return `
    <div class="card-estagio">

            <div class="card-header">
                <div class="meus-estagios-desktop-titulo">
                    <h2><i class="fa-regular fa-building"></i>${estagio.empresa}</h2>
                    <span id="status-desktop">${estagio.status}</span>
                </div>
                <button class="btn-detalhes"><i class="fa-regular fa-eye"></i> Detalhes</button>
            </div>

            <p id="status-mobile">${estagio.status}</p>
            <div class="meus-estagios-desktop">
                <p id="inicio"><i class="fa-regular fa-calendar"></i> <span>Início:</span>${data}</p>
                <p id="orientador"><span>Orientador:</span>${nome_orientador}</p>
            </div>
            <p id="curso"><span>Curso:</span>${estagio.curso_aluno}</p>
        </div>
`;
    })
    .join("");
}

async function carregarEstagiosCadastrados() {
  try {
    //espera a requisição dos dados da API ser completada
    const resposta = await fetch(URL_ESTAGIOS);
    //se der erro vai pro catch
    if (!resposta.ok) throw new Error();
    //converte a resposta JSON em objeto/array js
    const dados = await resposta.json();
    renderizarEstagios(dados);
  } catch (error) {
    containerEstagios.innerHTML = `<p class="mensagem-erro">Erro ao carregar dados.</p>`;
  }
}
//chama a função apenas depois que o DOM estiver totalmente carregado
document.addEventListener("DOMContentLoaded", carregarEstagiosCadastrados);
