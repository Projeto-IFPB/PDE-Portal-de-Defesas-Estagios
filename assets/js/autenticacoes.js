document.addEventListener("DOMContentLoaded", () => {
    const perfilLogado = sessionStorage.getItem("perfilUsuario");
    const paginaAtual = window.location.pathname;

    if (!perfilLogado) {
        window.location.replace("index.html"); 
        return;
    }

    if (paginaAtual.includes("aluno") && perfilLogado !== "aluno") {
        window.location.replace("index.html");
    }
    
    if (paginaAtual.includes("orientador") && perfilLogado !== "orientador") {
        window.location.replace("index.html");
    }

    if (paginaAtual.includes("coordenador") && perfilLogado !== "coordenador") {
        window.location.replace("index.html");
    } else {
        document.body.style.visibility = "visible"
    }
})
