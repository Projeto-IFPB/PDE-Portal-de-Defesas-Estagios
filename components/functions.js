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

export async function total_alunos(id_orientador) {

    const lista_estagios = await carregar_estagios()

    if (lista_estagios) {
        // Filtra os estágios para permanecerem apenas os estagios orientados por um orientador específico e que tenham sido aceitos pelo mesmo
        const alunos_orientador = lista_estagios.filter(estagio => estagio["id_orientador"] === id_orientador && estagio['convite_orientacao'] === 'aceito')
        
        // Criação de um Set para armazenar uma unica vez cada aluno orientado
        const alunos_unicos = new Set();
        
        // Intera sobre os estágios e garante que não seja contado o mesmo aluno repetidamente, caso ele tenha sido orientado pelo mesmo orientador mais de uma vez
        alunos_orientador.forEach(estagio => {
            alunos_unicos.add(estagio['id_aluno']);
        });

        // Retorna a quantidade de alunos únicos
        return alunos_unicos.size;
    }
    else {
        console.log('erro ao carregar os estagios')
    }
}

// console.log(await total_alunos(3))

export async function estagios_em_orientacao(id_orientador) {

    const lista_estagios = await carregar_estagios()

    if (lista_estagios) {

        // Filtra os estágios para permanecerem apenas os estagios orientados por um orientador específico e que tenham sido aceitos pelo mesmo e que estejam em andamento
        const alunos_sendo_orientados = lista_estagios.filter(estagio => estagio["id_orientador"] === id_orientador && estagio['convite_orientacao'] === 'aceito' && estagio['status'] === 'em andamento')
        
        // Criação de um Set para armazenar uma unica vez cada aluno orientado
        const alunos_unicos = new Set();
        alunos_sendo_orientados.forEach(estagio => {
            alunos_unicos.add(estagio['id_aluno']);
        });

        // Retorna a quantidade de alunos únicos
        return alunos_unicos.size;
    }
    else {
        console.log('erro ao carregar os estagios')
    }
}

// console.log(await estagios_em_orientacao(3))

export async function pedidos_pendentes(id_orientador) {
    const lista_estagios = await carregar_estagios()

    if (lista_estagios) {

        // Filtra os estágios para permanecerem apenas os estagios que estão pendentes de aceitação por um orientador específico
        const pedidos_pendentes = lista_estagios.filter(estagio => estagio["id_orientador"] === id_orientador && estagio['convite_orientacao'] === 'pendente')
        return pedidos_pendentes.length;
    }
    else {
        console.log('erro ao carregar os estagios')
    }
}

// console.log(await pedidos_pendentes(3))

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

    container.appendChild(divCardAgendarDefesa);
}