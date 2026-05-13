const URL_ESTAGIOS = import.meta.env.VITE_URL_JSON_ESTAGIOS;
const URL_USUARIOS = import.meta.env.VITE_URL_JSON_USUARIOS;


// Função para carregar os estágios do mockapi. Retorna um array de objetos que representam os estágios
async function carregar_estagios() {
    const resposta_estagios = await fetch(URL_ESTAGIOS, {
        method: 'GET',
        headers: {'content-type':'application/json'}
        })

    if (resposta_estagios.ok) {
        return resposta_estagios.json()
    }
    else {
        return []
    }
}

export async function dados_estatisticos_orientador(id_orientador, tipo) {
    try {
        const lista_estagios = await carregar_estagios()

        if (!lista_estagios) return 0

        let estagios_filtrados = []

        if (tipo === 'total_alunos_orientador') {
            estagios_filtrados = lista_estagios.filter(estagio => estagio["id_orientador"] === String(id_orientador) && estagio['convite_orientacao'] === 'aceito')
        }
        else if (tipo === 'estagios_ativos_orientador') {
            estagios_filtrados = lista_estagios.filter(estagio => estagio["id_orientador"] === String(id_orientador) && estagio['convite_orientacao'] === 'aceito' && estagio['status'] === 'em andamento')
            return estagios_filtrados.length
        }
        else if (tipo === 'estagios_pendentes_orientador') {
            estagios_filtrados = lista_estagios.filter(estagio => estagio["id_orientador"] === String(id_orientador) && estagio['convite_orientacao'] === 'pendente')
        }

        const alunos_unicos = new Set();
        estagios_filtrados.forEach(estagio => alunos_unicos.add(estagio['id_aluno']));

        // Retorna a quantidade sem existir duplicatas
        return alunos_unicos.size;

    } catch (error) {
        console.log('erro ao carregar os estagios')
        return 0
    }
}

export async function dados_estatisticos_coordenador(curso, tipo) {
    try {
        const lista_estagios = await carregar_estagios()

        if (!lista_estagios) return 0

        let estagios_filtrados = []

        if (tipo === 'total_estagios_curso') {
            estagios_filtrados = lista_estagios.filter(estagio => estagio["curso_aluno"] === curso && estagio['convite_orientacao'] === 'aceito')
        }
        else if (tipo === 'estagios_ativos_curso') {
            estagios_filtrados = lista_estagios.filter(estagio => estagio["curso_aluno"] === curso && estagio['convite_orientacao'] === 'aceito' && estagio['status'] === 'em andamento')
        }
        else if (tipo === 'estagios_pendentes_orientador') {
            estagios_filtrados = lista_estagios.filter(estagio => estagio["curso_aluno"] === curso && estagio['convite_orientacao'] === 'pendente')
        }

        const alunos_unicos = new Set();
        estagios_filtrados.forEach(estagio => alunos_unicos.add(estagio['id_aluno']));

        // Retorna a quantidade sem existir duplicatas
        return alunos_unicos.size;

    } catch (error) {
        console.log('erro ao carregar os estagios')
        return 0
    }
}

export function renderizarDashboardInformativo(configuracaoCards) {
    const container = document.querySelector('.dashboard-informativo');
    if (!container) return;

    container.innerHTML = "";

    configuracaoCards.forEach(card => {
        const divCardInformativo = document.createElement("div");
        divCardInformativo.className = `card ${card.classesCss}`;''

        divCardInformativo.innerHTML = `
            <div class="card-content">
                <div class="card-informacoes">
                    <p class="card-label">${card.titulo}</p>
                    <h2 class="card-valor">0</h2>
                </div>
                <i class="card-icone fa-solid ${card.icone}"></i>
            </div>
        `;

        container.appendChild(divCardInformativo);
    });

    const divCardAgendarDefesa = document.createElement("div");
    divCardAgendarDefesa.className = `card card-agendar-defesa`;

    divCardAgendarDefesa.innerHTML = `
        <div class="card-content card-content-agendar">
            <p class="card-label-agendar">Agendar Defesa de Estágio</p>
            <button class="btn-agendar">Agendar Defesa</button>
        </div>
    `;

    const btnAbrir = divCardAgendarDefesa.querySelector(".btn-agendar");
    const overlay = document.getElementById("modal-overlay");
    const fecharModal = document.getElementById("fechar-modal-estagio");
    const botaoCancelar = document.querySelector(".botao-cancelar");

    const abrir = () => {
        overlay.classList.add("ativo");
        document.body.style.overflow = "hidden";
    };

    const fechar = () => {
        overlay.classList.remove("ativo");
        document.body.style.overflow = "";
    };

    if (btnAbrir) btnAbrir.addEventListener("click", abrir);
    if (fecharModal) fecharModal.addEventListener("click", fechar);
    if (botaoCancelar) botaoCancelar.addEventListener("click", fechar);
    
    if (overlay) {
        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) fechar();
        });
    }

    container.appendChild(divCardAgendarDefesa);
}

// botoes arquivos dos modais
export function configurarUpload(inputId, labelId, spanId) {
    const input = document.getElementById(inputId);
    const label = document.getElementById(labelId);
    const span = document.getElementById(spanId);

    input.addEventListener('change', function() {
        const fileName = this.files[0] ? this.files[0].name : "Selecionar arquivo (máx. 25KB) ...";
        
        if (this.files[0]) {
            label.classList.add('envio-sucesso');
            span.innerHTML = `<i class="fa-solid fa-check"></i> ${fileName}`;
        } else {
            label.classList.remove('envio-sucesso');
            span.textContent = "Selecionar arquivo (máx. 25KB) ...";
        }
    });
}
export const resetarBotaoUpload = () => {
  const ids = [
    { label: 'label-compromisso', span: 'span-compromisso' },
    { label: 'label-orientacao', span: 'span-orientacao' }
  ];

  ids.forEach(id => {
    const label = document.getElementById(id.label);
    const span = document.getElementById(id.span);
    
    if (label && span) {
      label.classList.remove('envio-sucesso');
      span.textContent = "Selecionar arquivo (máx. 25KB) ...";
    }
  });
};

// Cards Orientaçoes

export async function carregar_alunos() {;

  const busca = await fetch(URL_USUARIOS);
  const lista_usuarios = await busca.json();
  const usuario_logado = lista_usuarios.find((user) => user["email"] === localStorage.getItem("EmailUsuario"));
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
      const data = new Date(ano, mes - 1, dia).toLocaleDateString("pt-BR");

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
              <a href="mailto:${email_aluno}"><i class="fa-regular fa-envelope"></i> ${email_aluno} </a>
              <p><i class="fa-solid fa-hotel"></i> ${estagio["empresa"]}</p>
              <p><i class="fa-regular fa-calendar"></i> ${data}</p>
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
