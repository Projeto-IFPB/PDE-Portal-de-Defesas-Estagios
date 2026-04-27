function Troca_Telas() {
  // Seleciona os elementos
  const cartaoAutenticacao = document.getElementById("cartaoAutenticacao");
  const botaoParaCadastro = document.getElementById("botaoParaCadastro");
  const botaoParaLogin = document.getElementById("botaoParaLogin");

  // Verificacao: se nao existe o elemento na pagina ele passa reto
  if (!cartaoAutenticacao || !botaoParaCadastro || !botaoParaLogin) return;
  // Evento para ir para a tela de Cadastro
  botaoParaCadastro.addEventListener("click", (e) => {
    e.preventDefault();
    cartaoAutenticacao.classList.add("mostrar-cadastro");
  });

  // Evento para voltar para a tela de Login
  botaoParaLogin.addEventListener("click", (e) => {
    e.preventDefault();
    cartaoAutenticacao.classList.remove("mostrar-cadastro");
  });
}
function campos_preenchidos() {
  let campos = document.querySelectorAll("campos_validacao");
  let preenchidos = true;

  for (let i = 0; campos.length > i; i++) {
    let campo = campos[i];

    if (campo.value === "" || campo.value === null) {
      preenchidos = false;
    }
  }
  return preenchidos;
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
  const resposta = await fetch("../data/users.json");
  const users = await resposta.json();

  // Procura o usuário com o email fornecido
  const email_encontrado = users.find((user) => user.email === email_value);

  // Se encontrar o email, verifica se a senha bate com a senha armazenada
  if (email_encontrado) {
    if (email_encontrado.password_hash === password_value) {
      alert("Login bem-sucedido!");
      email.value = "";
      password.value = "";
      return (current_user = email_encontrado);
    } else {
      alert("Senha incorreta!");
      password.value = "";
    }
  } else {
    alert("Email não encontrado!");
    email.value = "";
    password.value = "";
  }
}
function Comparar_Senhas() {
  const senha = document.getElementById("cadastro-senha");
  const confirmar_senha = document.getElementById("cadastro-confirmar-senha");

  if (senha.value !== confirmar_senha.value) {
    console.log("As senhas Não coincidem");
    return false;
  }
  return true;
}
// Selecão do botão de Login e evento que chama a função quando o botão for clicado
const btn_entrar = document.querySelector("#botao-login");
btn_entrar.addEventListener("click", login);

// DomContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  Troca_Telas();
});
