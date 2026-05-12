import{n as e}from"./modulepreload-polyfill-DvoRgtBb.js";async function t(){let e=await fetch(o,{method:`GET`,headers:{"content-type":`application/json`}});return e.ok?e.json():[]}async function n(e){let n=await t();if(n){let t=n.filter(t=>t.id_orientador===e&&t.convite_orientacao===`aceito`),r=new Set;return t.forEach(e=>{r.add(e.id_aluno)}),r.size}else console.log(`erro ao carregar os estagios`)}async function r(e){let n=await t();if(n){let t=n.filter(t=>t.id_orientador===e&&t.convite_orientacao===`aceito`&&t.status===`em andamento`),r=new Set;return t.forEach(e=>{r.add(e.id_aluno)}),r.size}else console.log(`erro ao carregar os estagios`)}async function i(e){let n=await t();if(n)return n.filter(t=>t.id_orientador===e&&t.convite_orientacao===`pendente`).length;console.log(`erro ao carregar os estagios`)}function a(e){let t=document.querySelector(`.dashboard-informativo`);if(!t)return;t.innerHTML=``,e.forEach(e=>{let n=document.createElement(`div`);n.className=`card ${e.classesCss}`,n.innerHTML=`
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
    `;let r=n.querySelector(`.btn-agendar`),i=document.getElementById(`modal-overlay`),a=document.getElementById(`fechar-modal-estagio`),o=document.querySelector(`.botao-cancelar`),s=()=>{i.classList.add(`ativo`),document.body.style.overflow=`hidden`},c=()=>{i.classList.remove(`ativo`),document.body.style.overflow=``};r&&r.addEventListener(`click`,s),a&&a.addEventListener(`click`,c),o&&o.addEventListener(`click`,c),i&&i.addEventListener(`click`,e=>{e.target===i&&c()}),t.appendChild(n)}var o,s=e((()=>{o=void 0}));export{n as a,a as i,s as n,i as r,r as t};