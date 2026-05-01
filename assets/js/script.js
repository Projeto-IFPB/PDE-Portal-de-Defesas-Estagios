import bcrypt from "bcryptjs";
const URL_CADASTRO = import.meta.env.VITE_URL_JSON;

function Troca_Telas() {
  // ==========================================
  // 1. VARIÁVEIS DE ESTADO E SELEÇÃO DE ELEMENTOS
  // ==========================================
  let isDesktop = window.innerWidth >= 768; // Verifica a largura atual na hora que a página carrega
  let isTelaLogin = true; // Guarda se o usuário está na tela de Login ou Cadastro

  // Containers que vão deslizar
  const containerPaineis = document.getElementById("containerPaineis");
  const containerAzul = document.getElementById("containerAzul");

  // Botões
  const botaoRedirecionarCadastro = document.getElementById(
    "botaoRedirecionarCadastro"
  );
  const botaoRedirecionarLogin = document.getElementById(
    "botaoRedirecionarLogin"
  );
  const linkRedirecionarCadastro = document.getElementById(
    "linkRedirecionarCadastro"
  );
  const linkRedirecionarLogin = document.getElementById(
    "linkRedirecionarLogin"
  );

  // Seções
  const painelCamposLogin = document.getElementById("painelCamposLogin");
  const painelCamposCadastro = document.getElementById("painelCamposCadastro");
  const painelRedirecionarCadastro = document.getElementById(
    "painelRedirecionarCadastro"
  );
  const painelRedirecionarLogin = document.getElementById(
    "painelRedirecionarLogin"
  );

  // ==========================================
  // 2. FUNÇÕES AUXILIARES
  // ==========================================
  // Função para alterar a visibilidade e opacidade de um elemento rapidamente
  const definirVisibilidade = (elemento, isVisivel) => {
    if (!elemento) return;
    elemento.style.visibility = isVisivel ? "visible" : "hidden";
    elemento.style.opacity = isVisivel ? "1" : "0";
  };

  // Função para zerar transições de uma lista de elementos
  const resetarTransicoes = (elementos) => {
    elementos.forEach((el) => {
      if (el) el.style.transition = "none";
    });
  };

  // Função que gerencia o deslizamento dos containers via JavaScript
  const deslizarPaineis = (isLogin) => {
    if (containerPaineis) {
      containerPaineis.style.transform = isLogin
        ? "translateX(0)"
        : "translateX(-50%)";
    }
    if (containerAzul && isDesktop) {
      // O container Azul só desliza se for Desktop
      containerAzul.style.transform = isLogin
        ? "translateX(0)"
        : "translateX(-100%)";
    }
  };

  // Função que esconde (display: none) os elementos que não pertencem ao layout atual
  const aplicarDisplayCorreto = () => {
    if (isDesktop) {
      if (linkRedirecionarCadastro)
        linkRedirecionarCadastro.style.display = "none";
      if (linkRedirecionarLogin) linkRedirecionarLogin.style.display = "none";

      if (containerAzul) containerAzul.style.display = "block";
      if (painelRedirecionarCadastro)
        painelRedirecionarCadastro.style.display = "flex";
      if (painelRedirecionarLogin)
        painelRedirecionarLogin.style.display = "flex";
    } else {
      if (linkRedirecionarCadastro)
        linkRedirecionarCadastro.style.display = "block";
      if (linkRedirecionarLogin) linkRedirecionarLogin.style.display = "block";

      // Oculta os painéis do Desktop no Mobile
      if (containerAzul) containerAzul.style.display = "none";
      if (painelRedirecionarCadastro)
        painelRedirecionarCadastro.style.display = "none";
      if (painelRedirecionarLogin)
        painelRedirecionarLogin.style.display = "none";
    }
  };

  // ==========================================
  // 3. GERENCIADOR DE LAYOUT E REDIMENSIONAMENTO
  // ==========================================
  // Esta função arruma a casa. Ela é chamada no início e toda vez que a tela muda de tamanho.
  const atualizarLayout = () => {
    aplicarDisplayCorreto();
    resetarTransicoes([
      painelCamposLogin,
      painelRedirecionarCadastro,
      painelRedirecionarLogin,
      painelCamposCadastro,
    ]);

    if (isDesktop) {
      if (isTelaLogin) {
        definirVisibilidade(painelCamposLogin, true);
        definirVisibilidade(painelRedirecionarCadastro, true);
        definirVisibilidade(painelRedirecionarLogin, false);
        definirVisibilidade(painelCamposCadastro, false);
      } else {
        definirVisibilidade(painelCamposLogin, false);
        definirVisibilidade(painelRedirecionarCadastro, false);
        definirVisibilidade(painelRedirecionarLogin, true);
        definirVisibilidade(painelCamposCadastro, true);
      }
    } else {
      // Layout Mobile
      if (isTelaLogin) {
        definirVisibilidade(painelCamposLogin, true);
        definirVisibilidade(painelCamposCadastro, false);
      } else {
        definirVisibilidade(painelCamposLogin, false);
        definirVisibilidade(painelCamposCadastro, true);
      }
    }

    // Garante que o slider esteja no lugar certo
    deslizarPaineis(isTelaLogin);
  };

  // Monitor de redimensionamento contínuo
  window.addEventListener("resize", () => {
    const telaAtualIsDesktop = window.innerWidth >= 768;

    // Só dispara a reconfiguração se cruzou a fronteira dos 768px
    if (isDesktop !== telaAtualIsDesktop) {
      isDesktop = telaAtualIsDesktop; // Atualiza a variável
      atualizarLayout(); // Reconfigura a tela instantaneamente
    }
  });

  // Inicialização da página
  atualizarLayout();

  // ==========================================
  // 4. LÓGICA DE TRANSIÇÃO (Cliques)
  // ==========================================
  const irParaCadastro = (e) => {
    e.preventDefault();
    isTelaLogin = false;
    const elementos = [
      painelCamposLogin,
      painelRedirecionarCadastro,
      painelRedirecionarLogin,
      painelCamposCadastro,
    ];
    resetarTransicoes(elementos);

    if (isDesktop) {
      // Prepara a tela de destino (Torna elementos clicáveis)
      painelRedirecionarLogin.style.visibility = "visible";
      painelCamposCadastro.style.visibility = "visible";

      // Oculta visualmente as telas antigas e mostra as novas instantaneamente
      painelCamposLogin.style.opacity = "0";
      painelRedirecionarCadastro.style.opacity = "0";
      painelRedirecionarLogin.style.opacity = "0";
      painelCamposCadastro.style.opacity = "1";

      // Remove o foco (TAB) das telas antigas
      painelCamposLogin.style.visibility = "hidden";
      painelRedirecionarCadastro.style.visibility = "hidden";

      deslizarPaineis(false); // Deslize para esquerda

      // Aplica o fade-in no painel informativo com delay
      setTimeout(() => {
        painelRedirecionarLogin.style.transition = "opacity 0.5s ease";
        painelRedirecionarLogin.style.opacity = "1";
      }, 350);
    } else {
      // Mobile
      definirVisibilidade(painelCamposCadastro, true);
      deslizarPaineis(false); // Deslize para esquerda

      // Aguarda a animação de slide antes de esconder o form anterior
      setTimeout(() => {
        definirVisibilidade(painelCamposLogin, false);
      }, 350);
    }
  };

  const voltarParaLogin = (e) => {
    e.preventDefault();
    isTelaLogin = true;
    const elementos = [
      painelCamposLogin,
      painelRedirecionarCadastro,
      painelRedirecionarLogin,
      painelCamposCadastro,
    ];
    resetarTransicoes(elementos);

    if (isDesktop) {
      painelCamposLogin.style.visibility = "visible";
      painelRedirecionarCadastro.style.visibility = "visible";

      painelRedirecionarCadastro.style.opacity = "0";
      painelRedirecionarLogin.style.opacity = "0";
      painelCamposCadastro.style.opacity = "0";
      painelCamposLogin.style.opacity = "1";

      painelRedirecionarLogin.style.visibility = "hidden";
      painelCamposCadastro.style.visibility = "hidden";

      deslizarPaineis(true); // Deslize para direita

      setTimeout(() => {
        painelRedirecionarCadastro.style.transition = "opacity 0.5s ease";
        painelRedirecionarCadastro.style.opacity = "1";
      }, 350);
    } else {
      // Mobile
      definirVisibilidade(painelCamposLogin, true);
      deslizarPaineis(true); // Deslize para direita

      setTimeout(() => {
        definirVisibilidade(painelCamposCadastro, false);
      }, 350);
    }
  };

  // ==========================================
  // 5. ATRIBUIÇÃO DOS EVENTOS AOS BOTÕES
  // ==========================================
  if (botaoRedirecionarCadastro)
    botaoRedirecionarCadastro.addEventListener("click", irParaCadastro);
  if (linkRedirecionarCadastro)
    linkRedirecionarCadastro.addEventListener("click", irParaCadastro);

  if (botaoRedirecionarLogin)
    botaoRedirecionarLogin.addEventListener("click", voltarParaLogin);
  if (linkRedirecionarLogin)
    linkRedirecionarLogin.addEventListener("click", voltarParaLogin);
}

function campos_preenchidos() {
  let campos = document.querySelectorAll(".campos_validacao");
  let preenchidos = true;

  for (let i = 0; campos.length > i; i++) {
    let campo = campos[i];

    if (campo.value === "" || campo.value === null) {
      mostrarMensagem("mensagem-cadastro", "Preencha todos os campos!", "erro");
      preenchidos = false;
      break;
    }
  }
  return preenchidos;
}

function Comparar_Senhas() {
  const senha = document.getElementById("cadastro-senha");
  const confirmar_senha = document.getElementById("cadastro-confirmar-senha");

  if (
    senha.value !== confirmar_senha.value ||
    senha.value === "" ||
    senha.value === null
  ) {
    mostrarMensagem("mensagem-cadastro", "As senhas não coincidem!", "erro");
    return false;
  }
  return true;
}

function Gerar_Hash(usuario) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(usuario["senha"], salt);

  // 3. Substitui a senha pura pelo hash
  usuario["senha"] = hash;

  // Remove o confirmar-senha como você já faz
  delete usuario["confirmar-senha"];

  return usuario;
}

function Cadastro() {
  const formulario = document.getElementById("formularioCadastro");
  const botaoEnviar = formulario.querySelector('button[type="submit"]');

  formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    if (!campos_preenchidos() || !Comparar_Senhas()) {
      return;
    }
    botaoEnviar.disabled = true;
    const textoOriginal = botaoEnviar.innerText;
    botaoEnviar.innerText = "Carregando...";

    let dados = new FormData(formulario);
    let usuario = Object.fromEntries(dados.entries());
    Gerar_Hash(usuario);

    try {
      const busca = await fetch(URL_CADASTRO);
      const lista_usuarios = await busca.json();

      const email_existe = lista_usuarios.some(
        (u) => u["email"] === usuario["email"]
      );
      const nome_existe = lista_usuarios.some(
        (u) => u["nome"] === usuario["nome"]
      );

      if (email_existe) {
        mostrarMensagem("mensagem-cadastro", "Este e-mail já está cadastrado!", "erro");
        formulario.email.value = "";
        return;
      }
      if (nome_existe) {
        mostrarMensagem("mensagem-cadastro", "Este nome já está cadastrado!", "erro");
        formulario.nome.value = "";
        return;
      }
      // Envia para o JSON da API
      const resposta = await fetch(URL_CADASTRO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      if (resposta.ok) {
        mostrarMensagem("mensagem-cadastro", "Cadastro realizado com sucesso!", "sucesso");
        formulario.reset();
        document.getElementById("botaoRedirecionarLogin").click();
      } else {
        mostrarMensagem("mensagem-cadastro", "Erro ao salvar os dados.", "erro");
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      mostrarMensagem("mensagem-cadastro", "Não foi possível conectar ao servidor.", "erro");
    } finally {
      botaoEnviar.disabled = false;
      botaoEnviar.innerText = textoOriginal;
    }
  });
}

// Lógica de Login
async function login(event) {
  // Impede o envio padrão do formulário
  event.preventDefault();

  // Pega os valores dos campos de email e senha
  let email = document.querySelector("#login-email");
  let email_value = email.value;
  let password = document.querySelector("#login-senha");
  let password_value = password.value;

  // Busca o arquivo JSON e converte para um objeto JavaScript
  const resposta = await fetch(URL_CADASTRO);
  const users = await resposta.json();

  // Procura o usuário com o email fornecido
  const email_encontrado = users.find((user) => user["email"] === email_value);

  // Se encontrar o email, verifica se a senha bate com a senha armazenada
  if (email_encontrado) {
    const SenhaCorreta = bcrypt.compareSync(
      password_value,
      email_encontrado["senha"]
    );
    if (SenhaCorreta) {
      mostrarMensagem("mensagem-login", "Login bem-sucedido!", "sucesso");
      email.value = "";
      password.value = "";
      sessionStorage.setItem("perfilUsuario", email_encontrado["perfil"]);
    if (email_encontrado["perfil"] === "aluno") {
        window.location.replace("../pages/pagina_aluno.html");
    // Conforme fomos fazendo as paginas a gente des-comenta as proximas linhas
    }/* else if (usuarioEncontrado.perfil === "orientador") {
        window.location.replace("../pages/pagina_orientador.html");
    } else if (usuarioEncontrado.perfil === "coordenador") {
        window.location.replace("../pages/pagina_coordenador.html");
    }*/
    } else {
      mostrarMensagem("mensagem-login", "Senha incorreta!", "erro");
      password.value = "";
    }
  } else {
    mostrarMensagem("mensagem-login", "Email não encontrado!", "erro");
    email.value = "";
    password.value = "";
  }
}

// Selecão do botão de Login e evento que chama a função quando o botão for clicado
const btn_entrar = document.querySelector("#botao-login");
btn_entrar.addEventListener("click", login);

// DomContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  Troca_Telas();
  Cadastro();
});


//Função reutilizável de mensagens
function mostrarMensagem(idElemento, texto, tipo) {
    //Busca o elemento pelo id no HTML
    const mensagem = document.getElementById(idElemento);

    //Limpa o estado antigo
    mensagem.className = "mensagem";
     //Troca o texto dentro do elemento
    mensagem.textContent = texto;
    //Retira o display None
    mensagem.classList.remove("oculto");

    //Verifica o tipo, adiciona classe de acordo com isso e remove .oculto
    if(tipo === "sucesso") {
        mensagem.classList.add("sucesso");
    } else {
        mensagem.classList.add("erro");
    }

    //Garante que mensagem esteja visível
    mensagem.classList.remove("fade-out");
    //Força a reiniciar animação CSS
    void mensagem.offsetWidth;
    //sucess = 2500ms error = 4000ms
    const tempo = tipo === "sucesso" ? 2500 : 4000;

    //Adiciona fade-out depois do "tempo", espera animção terminar e some
    setTimeout(() => {
      mensagem.classList.add("fade-out")

      setTimeout(() => {
        mensagem.classList.add("oculto");
      }, 800)
    }, tempo);
}
