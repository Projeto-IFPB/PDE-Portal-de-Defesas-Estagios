// const URL_ESTAGIOS = import.meta.env.URL_ESTAGIOS;
const URL_ESTAGIOS = import.meta.env.URL_ESTAGIOS;

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

async function total_alunos(id_orientador) {

    const lista_estagios = await carregar_estagios()

    if (lista_estagios) {
        // Filtra os estágios para permanecerem apenas os estagios orientados por um orientador específico e que tenham sido aceitos pelo mesmo
        const alunos_orientador = lista_estagios.filter(estagio => estagio["id-orientador"] === id_orientador && estagio['convite-orientacao'] === 'aceito')
        
        // Criação de um Set para armazenar uma unica vez cada aluno orientado
        const alunos_unicos = new Set();
        
        // Intera sobre os estágios e garante que não seja contado o mesmo aluno repetidamente, caso ele tenha sido orientado pelo mesmo orientador mais de uma vez
        alunos_orientador.forEach(estagio => {
            alunos_unicos.add(estagio['id-aluno']);
        });

        // Retorna a quantidade de alunos únicos
        return alunos_unicos.size;
    }
    else {
        console.log('erro ao carregar os estagios')
    }
}

// console.log(await total_alunos(3))

async function estagios_em_orientacao(id_orientador) {

    const lista_estagios = await carregar_estagios()

    if (lista_estagios) {

        // Filtra os estágios para permanecerem apenas os estagios orientados por um orientador específico e que tenham sido aceitos pelo mesmo e que estejam em andamento
        const alunos_sendo_orientados = lista_estagios.filter(estagio => estagio["id-orientador"] === id_orientador && estagio['convite-orientacao'] === 'aceito' && estagio['status'] === 'em andamento')
        
        // Criação de um Set para armazenar uma unica vez cada aluno orientado
        const alunos_unicos = new Set();
        alunos_sendo_orientados.forEach(estagio => {
            alunos_unicos.add(estagio['id-aluno']);
        });

        // Retorna a quantidade de alunos únicos
        return alunos_unicos.size;
    }
    else {
        console.log('erro ao carregar os estagios')
    }
}

// console.log(await estagios_em_orientacao(3))

async function pedidos_pendentes(id_orientador) {
    const lista_estagios = await carregar_estagios()

    if (lista_estagios) {

        // Filtra os estágios para permanecerem apenas os estagios que estão pendentes de aceitação por um orientador específico
        const pedidos_pendentes = lista_estagios.filter(estagio => estagio["id-orientador"] === id_orientador && estagio['convite-orientacao'] === 'pendente')
        return pedidos_pendentes.length;
    }
    else {
        console.log('erro ao carregar os estagios')
    }
}

// console.log(await pedidos_pendentes(3))