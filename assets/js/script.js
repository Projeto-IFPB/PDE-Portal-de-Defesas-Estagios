document.addEventListener("DOMContentLoaded", () => {
    // Seleciona os elementos
    const cartaoAutenticacao = document.getElementById('cartaoAutenticacao');
    const botaoParaCadastro = document.getElementById('botaoParaCadastro');
    const botaoParaLogin = document.getElementById('botaoParaLogin');

    // Evento para ir para a tela de Cadastro
    botaoParaCadastro.addEventListener('click', (e) => {
        e.preventDefault();
        cartaoAutenticacao.classList.add('mostrar-cadastro'); 
    });

    // Evento para voltar para a tela de Login
    botaoParaLogin.addEventListener('click', (e) => {
        e.preventDefault();
        cartaoAutenticacao.classList.remove('mostrar-cadastro'); 
    });
});