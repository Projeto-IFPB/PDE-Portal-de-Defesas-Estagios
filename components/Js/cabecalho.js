// components/cabecalho.js

export function injetarCabecalho() {
    const conteiner = document.getElementById('conteiner-cabecalho');
    
    if (!conteiner) {
        console.error('Div #conteiner-cabecalho não encontrada na página.');
        return;
    }

    // O HTML do nosso cabeçalho
    conteiner.innerHTML = `
        <header class="cabecalho-principal">
            <div class="cabecalho-logo">
                <img src="/assets/img/preview-pde-transparente.png" alt="Logo PDE">
            </div>
            
            <button class="botao-menu-mobile" id="botao-menu" aria-label="Abrir menu">
                <i class="ph ph-list"></i>
            </button>

            <nav class="cabecalho-navegacao" id="menu-navegacao">
                <div class="links-navegacao">
                    <a href="#" class="item-nav ativo">
                        <i class="ph ph-house"></i> Início
                    </a>
                    <a href="#" class="item-nav">
                        <i class="ph ph-user"></i> Perfil
                    </a>
                </div>
                
                <div class="icones-acao">
                    <button class="botao-icone" aria-label="Notificações">
                        <i class="ph ph-bell"></i>
                    </button>
                    <button class="botao-icone" aria-label="Alternar Tema Escuro">
                        <i class="ph ph-moon"></i>
                    </button>
                    <button class="botao-icone" aria-label="Alternar Tema Escuro" id="btn_logout">
                        <i class="ph ph-sign-out"></i>
                    </button>
                </div>
            </nav>
        </header>
    `;

    // Lógica simples para abrir/fechar o menu no celular
    const botaoMenu = document.getElementById('botao-menu');
    const menuNavegacao = document.getElementById('menu-navegacao');
    const botaoLogout = document.getElementById('btn_logout');

    botaoMenu.addEventListener('click', () => {
        menuNavegacao.classList.toggle('menu-aberto');
    });

    botaoLogout.addEventListener('click', () => {
        window.location.replace('/PDE-Portal-de-Defesas-Estagios/index.html');
        localStorage.removeItem("PerfilUsuario")
        localStorage.removeItem("EmailUsuario")
    })
}