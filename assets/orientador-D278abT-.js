import{t as e}from"./modulepreload-polyfill-DvoRgtBb.js";import{t}from"./autenticacoes-DFogqr4f.js";import{a as n,i as r,n as i,r as a,t as o}from"./functions-DNOT1TTY.js";var s=e((()=>{i();var e=void 0,t=void 0,s=[{titulo:`Total de Alunos`,icone:`fa-users`,classesCss:`card-alunos card-info-1`},{titulo:`Estágios ativos`,icone:`fa-briefcase`,classesCss:`card-estagios-ativos card-info-2`},{titulo:`Pendências`,icone:`fa-calendar`,classesCss:`card-pendencias card-info-3`}];async function c(){r(s);let i=(await(await fetch(t)).json()).find(e=>e.email===sessionStorage.getItem(`EmailUsuario`)),c=i?i.id:null;if(c){let e=await n(c),t=await o(c),r=await a(c);document.querySelector(`.card-alunos .card-valor`).textContent=e,document.querySelector(`.card-estagios-ativos .card-valor`).textContent=t,document.querySelector(`.card-pendencias .card-valor`).textContent=r}l((await(await fetch(e)).json()).filter(e=>e.id_orientador==c))}async function l(e){let n=await(await fetch(t)).json(),r=document.getElementById(`lista-estagios`);if(r.innerHTML=``,e.length===0){r.innerHTML=`<p>Nenhum estagio encontrado</p>`;return}e.forEach(e=>{let t=n.find(t=>t.id===e.id_aluno),i=`Não encontrado`,a=``;t&&(i=t.nome,a=t.email);let[o,s,c]=e.data_inicio.split(`-`),l=new Date(o,s-1,c).toLocaleDateString(`pt-BR`),u=document.createElement(`div`);u.innerHTML=`<div class="grid-alunos">
  <div class="card-aluno">
    <div class="header-card">
      <div class="circulo">
       <i class="fa-solid fa-graduation-cap"></i>
      </div>
      <div id="status">
       <span class="status">${e.status}</span>
      </div>
    </div>
    <div class="card-info">
    <h3>${i}</h3>
    <a href="mailto:${a}"><i class="fa-regular fa-envelope"></i> ${a} </a>
    <p><i class="fa-solid fa-hotel"></i> ${e.empresa}</p>
    <p><i class="fa-regular fa-calendar"></i> ${l}</p>
    </div>
  </div>`,r.appendChild(u)})}document.addEventListener(`DOMContentLoaded`,()=>{c()})}));t(),s();