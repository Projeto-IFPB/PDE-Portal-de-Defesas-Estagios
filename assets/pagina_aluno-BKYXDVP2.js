import{n as e,t}from"./modulepreload-polyfill-DvoRgtBb.js";import{t as n}from"./autenticacoes-DFogqr4f.js";var r,i=e((()=>{r=`/PDE-Portal-de-Defesas-Estagios/assets/preview-pde-transparente-CaxkgrCM.png`}));function a(){let e=document.getElementById(`conteiner-cabecalho`);if(!e){console.error(`Div #conteiner-cabecalho não encontrada na página.`);return}e.innerHTML=`
        <header class="cabecalho-principal">
            <div class="cabecalho-logo">
                <img src="${r}" alt="Logo PDE">
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
                </div>
            </nav>
        </header>
    `;let t=document.getElementById(`botao-menu`),n=document.getElementById(`menu-navegacao`);t.addEventListener(`click`,()=>{n.classList.toggle(`menu-aberto`)})}var o=e((()=>{i()})),s=t((()=>{o();var e=`https://69fa9cbb88a7af0ecca78a34.mockapi.io/estagios`,t=`https://69fa9cbb88a7af0ecca78a34.mockapi.io/usuarios`;a();var n=(e,t=`erro`)=>{let n=document.getElementById(`mensagem-estagio`);if(!n)return;n.textContent=e,n.classList.remove(`oculto`,`sucesso`,`erro`),n.classList.add(t===`sucesso`?`sucesso`:`erro`),n.dataset.timeoutId&&window.clearTimeout(n.dataset.timeoutId);let r=window.setTimeout(()=>{n.classList.add(`oculto`)},5e3);n.dataset.timeoutId=r},r=e=>new Promise((t,n)=>{if(!e){t(null);return}let r=new FileReader;r.onload=()=>t(r.result),r.onerror=()=>n(Error(`Falha ao ler o arquivo`)),r.readAsDataURL(e)});document.addEventListener(`DOMContentLoaded`,()=>{let a=document.getElementById(`abrir-modal-estagio`),o=document.getElementById(`modal-overlay`),s=document.getElementById(`fechar-modal-estagio`),c=document.querySelector(`.botao-cancelar`),u=document.getElementById(`formulario-estagio`),d=()=>{o.classList.add(`ativo`),document.body.style.overflow=`hidden`},f=()=>{o.classList.remove(`ativo`),document.body.style.overflow=``};a&&a.addEventListener(`click`,d),s&&s.addEventListener(`click`,f),c&&c.addEventListener(`click`,f),o&&o.addEventListener(`click`,e=>{e.target===o&&f()}),u&&u.addEventListener(`submit`,async a=>{a.preventDefault();let o=u.querySelector(`[name=empresa]`).value.trim(),s=u.querySelector(`[name=dataInicio]`).value,c=u.querySelector(`[name=nomeOrientador]`).value.trim(),d=u.querySelector(`[name=cursoEstagiario]`).value.trim(),p=u.querySelector(`[name=emailCoordenador]`).value.trim(),m=u.querySelector(`[name=termoCompromisso]`).files[0],h=u.querySelector(`[name=termoOrientacao]`).files[0],g=u.querySelector(`button[type=submit]`);if(!o||!s||!c||!d||!p||!m||!h){n(`Preencha todos os campos obrigatórios.`,`erro`);return}g.disabled=!0;let _=g.innerText;g.innerText=`Enviando...`;try{let a=await(await fetch(t)).json(),g=a.find(e=>e.nome===c),_=null;g?_=g.id:n(`Não foi possivel encontrar esse orientador.`,`erro`);let v=a.find(e=>e.email===sessionStorage.getItem(`EmailUsuario`)).id,y=a.find(e=>e.email===p),b=null,x=null;y?(b={id_coordenador:y.id},x=[],x.push(b)):n(`Não foi possivel o coordenador.`,`erro`);let[S,C]=await Promise.all([r(m),r(h)]),w={empresa:o,curso_aluno:d,data_inicio:s,id_aluno:v,id_orientador:_,id_banca_examinadora:x,status:`em andamento`,convite_orientacao:`aceito`,termo_compromisso:{fileName:m.name,fileType:m.type,fileSize:m.size,path:`files/termo-compromisso/${m.name}`,content:S},termo_orientacao:{fileName:h.name,fileType:h.type,fileSize:h.size,path:`files/termo-orientacao/${h.name}`,content:C}};(await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(w)})).ok?(n(`Estágio cadastrado com sucesso!`,`sucesso`),await l(),await i(),u.reset(),f()):n(`Não foi possível cadastrar o estágio.`,`erro`)}catch(e){console.error(`Erro ao enviar cadastro de estágio:`,e),n(`Erro ao enviar o cadastro do estágio.`,`erro`)}finally{g.disabled=!1,g.innerText=_}})});async function i(){try{let e=await(await fetch(t)).json(),n=document.getElementById(`lista-orientadores`),r=document.getElementById(`lista-coordenadores`);n.innerHTML=``,r.innerHTML=``,e.forEach(e=>{let t=document.createElement(`option`);e.perfil===`orientador`&&(t.value=e.nome,n.appendChild(t.cloneNode(!0))),e.perfil===`coordenador`&&(t.value=e.email,r.appendChild(t))})}catch(e){console.error(`Erro ao carregar sugestões:`,e)}}var s=document.getElementById(`container-meus-estagios`);async function c(e){let n=await(await fetch(t)).json(),r=sessionStorage.getItem(`EmailUsuario`),i=n.find(e=>e.email===r),a=i?i.id:null,o=e.filter(e=>e.id_aluno==a);if(o.length===0){s.innerHTML=`
    <div class="mensagem-vazia">
      <i class="fa-solid fa-folder-open"></i>
      <p>Você ainda não possui estagios cadastrados.</p>
    </div>`;return}s.innerHTML=o.map(e=>{let t=n.find(t=>t.id===e.id_orientador),r=t?t.nome:`Não Cadastrado`,[i,a,o]=e.data_inicio.split(`-`),s=new Date(i,a-1,o).toLocaleDateString(`pt-BR`);return`
    <div class="card-estagio">

            <div class="card-header">
                <div class="meus-estagios-desktop-titulo">
                    <h2><i class="fa-regular fa-building"></i>${e.empresa}</h2>
                    <span id="status-desktop">${e.status}</span>
                </div>
                <button class="btn-detalhes"><i class="fa-regular fa-eye"></i> Detalhes</button>
            </div>

            <p id="status-mobile">${e.status}</p>
            <div class="meus-estagios-desktop">
                <p id="inicio"><i class="fa-regular fa-calendar"></i> <span>Início:</span>${s}</p>
                <p id="orientador"><span>Orientador:</span>${r}</p>
            </div>
            <p id="curso"><span>Curso:</span>${e.curso_aluno}</p>
        </div>
`}).join(``)}async function l(){try{let t=await fetch(e);if(!t.ok)throw Error();c(await t.json())}catch{s.innerHTML=`<p class="mensagem-erro">Erro ao carregar dados.</p>`}}document.addEventListener(`DOMContentLoaded`,()=>{l(),i()})}));n(),s();