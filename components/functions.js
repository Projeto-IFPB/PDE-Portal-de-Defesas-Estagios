const URL_ESTAGIOS = import.meta.env.VITE_URL_JSON_ESTAGIOS;

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