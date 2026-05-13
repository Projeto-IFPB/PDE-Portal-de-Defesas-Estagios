import{n as e,t}from"./modulepreload-polyfill-DvoRgtBb.js";var n=t((()=>{document.addEventListener(`DOMContentLoaded`,()=>{let e=localStorage.getItem(`PerfilUsuario`),t=window.location.pathname;if(!e){window.location.replace(`index.html`);return}t.includes(`aluno`)&&e!==`aluno`&&window.location.replace(`index.html`),t.includes(`orientador`)&&e!==`orientador`&&window.location.replace(`index.html`),t.includes(`coordenador`)&&e!==`coordenador`?window.location.replace(`index.html`):document.body.style.visibility=`visible`})}));async function r(){let e=await fetch(l,{method:`GET`,headers:{"content-type":`application/json`}});return e.ok?e.json():[]}async function i(e,t){try{let n=await r();if(!n)return 0;let i=[];if(t===`total_alunos_orientador`)i=n.filter(t=>t.id_orientador===String(e)&&t.convite_orientacao===`aceito`);else if(t===`estagios_ativos_orientador`)return i=n.filter(t=>t.id_orientador===String(e)&&t.convite_orientacao===`aceito`&&t.status===`em andamento`),i.length;else t===`estagios_pendentes_orientador`&&(i=n.filter(t=>t.id_orientador===String(e)&&t.convite_orientacao===`pendente`));let a=new Set;return i.forEach(e=>a.add(e.id_aluno)),a.size}catch{return console.log(`erro ao carregar os estagios`),0}}function a(e){let t=document.querySelector(`.dashboard-informativo`);if(!t)return;t.innerHTML=``,e.forEach(e=>{let n=document.createElement(`div`);n.className=`card ${e.classesCss}`,n.innerHTML=`
            <div class="card-content">
                <div class="card-informacoes">
                    <p class="card-label">${e.titulo}</p>
                    <h2 class="card-valor">0</h2>
                </div>
                <i class="card-icone fa-solid ${e.icone}"></i>
            </div>
        `,t.appendChild(n)});let n=document.createElement(`div`);n.className=`card card-agendar-defesa`,n.innerHTML=`
        <div class="card-content card-content-agendar">
            <p class="card-label-agendar">Agendar Defesa de Estágio</p>
            <button class="btn-agendar">Agendar Defesa</button>
        </div>
    `;let r=n.querySelector(`.btn-agendar`),i=document.getElementById(`modal-overlay`),a=document.getElementById(`fechar-modal-estagio`),o=document.querySelector(`.botao-cancelar`),s=()=>{i.classList.add(`ativo`),document.body.style.overflow=`hidden`},c=()=>{i.classList.remove(`ativo`),document.body.style.overflow=``};r&&r.addEventListener(`click`,s),a&&a.addEventListener(`click`,c),o&&o.addEventListener(`click`,c),i&&i.addEventListener(`click`,e=>{e.target===i&&c()}),t.appendChild(n)}function o(e,t,n){let r=document.getElementById(e),i=document.getElementById(t),a=document.getElementById(n);r.addEventListener(`change`,function(){let e=this.files[0]?this.files[0].name:`Selecionar arquivo (máx. 25KB) ...`;this.files[0]?(i.classList.add(`envio-sucesso`),a.innerHTML=`<i class="fa-solid fa-check"></i> ${e}`):(i.classList.remove(`envio-sucesso`),a.textContent=`Selecionar arquivo (máx. 25KB) ...`)})}async function s(){let e=(await(await fetch(u)).json()).find(e=>e.email===localStorage.getItem(`EmailUsuario`)),t=e?e.id:null;c((await(await fetch(l)).json()).filter(e=>e.id_orientador==t))}async function c(e){let t=await(await fetch(u)).json(),n=document.getElementById(`lista-estagios`);if(n.innerHTML=``,e.length===0){n.innerHTML=`<p>Nenhum estagio encontrado</p>`;return}e.forEach(e=>{let i=t.find(t=>t.id===e.id_aluno),a=`Não encontrado`,o=``;i&&(a=i.nome,o=i.email);let[s,c,l]=e.data_inicio.split(`-`),u=new Date(s,c-1,l).toLocaleDateString(`pt-BR`),d=document.createElement(`div`);d.className=`card-aluno`,d.innerHTML=`
          <div class="header-card">
              <div class="circulo">
                  <i class="fa-solid fa-graduation-cap"></i>
              </div>
              <div id="status">
                  <span class="status">${e.status}</span>
              </div>
          </div>
          <div class="card-info">
              <h3>${a}</h3>
              <a href="mailto:${o}"><i class="fa-regular fa-envelope"></i> ${o} </a>
              <p><i class="fa-solid fa-hotel"></i> ${e.empresa}</p>
              <p><i class="fa-regular fa-calendar"></i> ${u}</p>
          </div>
      `,d.addEventListener(`click`,()=>{r(a,o,e.empresa,e.curso_aluno,e.data_inicio,e.status)}),n.appendChild(d)});function r(e,t,n,r,i,a){let o=document.getElementById(`modal-detalhes`);document.getElementById(`detalhe-nome`).textContent=e,document.getElementById(`detalhe-email`).textContent=t||`Não informado`,document.getElementById(`detalhe-empresa`).textContent=n||`Não informado`,document.getElementById(`detalhe-curso`).textContent=r||`Não informado`,document.getElementById(`detalhe-data`).textContent=i,document.getElementById(`detalhe-status`).textContent=a,o.classList.add(`ativo`)}document.getElementById(`fechar-modal-detalhes`).addEventListener(`click`,()=>{document.getElementById(`modal-detalhes`).classList.remove(`ativo`)}),window.addEventListener(`click`,e=>{let t=document.getElementById(`modal-detalhes`);e.target===t&&t.classList.remove(`ativo`)})}var l,u,d,f=e((()=>{l=`https://69fa9cbb88a7af0ecca78a34.mockapi.io/estagios`,u=`https://69fa9cbb88a7af0ecca78a34.mockapi.io/usuarios`,d=()=>{[{label:`label-compromisso`,span:`span-compromisso`},{label:`label-orientacao`,span:`span-orientacao`}].forEach(e=>{let t=document.getElementById(e.label),n=document.getElementById(e.span);t&&n&&(t.classList.remove(`envio-sucesso`),n.textContent=`Selecionar arquivo (máx. 25KB) ...`)})}}));function p(){let e=document.getElementById(`conteiner-cabecalho`);if(!e){console.error(`Div #conteiner-cabecalho não encontrada na página.`);return}e.innerHTML=`
        <header class="cabecalho-principal">
            <div class="cabecalho-logo">
                <img src="../Logo_PDE_Isolada.png" alt="Logo PDE">
                <p>PDE</p>
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
    `;let t=document.getElementById(`botao-menu`),n=document.getElementById(`menu-navegacao`),r=document.getElementById(`btn_logout`);t.addEventListener(`click`,()=>{n.classList.toggle(`menu-aberto`)}),r.addEventListener(`click`,()=>{window.location.replace(`/PDE-Portal-de-Defesas-Estagios/index.html`),localStorage.removeItem(`PerfilUsuario`),localStorage.removeItem(`EmailUsuario`)})}var m=e((()=>{}));export{i as a,d as c,o as i,n as l,p as n,f as o,s as r,a as s,m as t};