const URL_ESTAGIO = import.meta.env.VITE_URL_JSON_ESTAGIO;

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
      const nomeOrientador = formulario.querySelector("[name=nomeOrientador]").value.trim();
      const cursoEstagiario = formulario.querySelector("[name=cursoEstagiario]").value.trim();
      const emailCoordenador = formulario.querySelector("[name=emailCoordenador]").value.trim();
      const termoCompromisso = formulario.querySelector("[name=termoCompromisso]").files[0];
      const termoOrientacao = formulario.querySelector("[name=termoOrientacao]").files[0];
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
        const [compBase64, oriBase64] = await Promise.all([
          lerArquivoComoBase64(termoCompromisso),
          lerArquivoComoBase64(termoOrientacao),
        ]);

        const payload = {
          empresa,
          dataInicio,
          nomeOrientador,
          cursoEstagiario,
          emailCoordenador,
          termoCompromisso: {
            fileName: termoCompromisso.name,
            fileType: termoCompromisso.type,
            fileSize: termoCompromisso.size,
            path: `files/termo-compromisso/${termoCompromisso.name}`,
            content: compBase64,
          },
          termoOrientacao: {
            fileName: termoOrientacao.name,
            fileType: termoOrientacao.type,
            fileSize: termoOrientacao.size,
            path: `files/termo-orientacao/${termoOrientacao.name}`,
            content: oriBase64,
          },
        };

        const resposta = await fetch(URL_ESTAGIO, {
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
