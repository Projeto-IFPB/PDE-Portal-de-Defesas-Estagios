import { renderizarDashboardInformativo } from '../../components/functions.js';
import { injetarCabecalho } from '../../components/cabecalho.js';

injetarCabecalho()

const configuracaoCardsInformativos = [
    { titulo: "Total de Estágios",
      icone: "fa-users",
      classesCss: "card-total-estagios card-info-1" },

    { titulo: "Em andamento",
      icone: "fa-briefcase",
      classesCss: "card-estagios-andamento card-info-2" },

    { titulo: "Pendentes",
      icone: "fa-calendar",
      classesCss: "card-estagios-pendentes card-info-3" },

    { titulo: "Orientações",
      icone: "fa-graduation-cap",
      classesCss: "card-orientacoes card-info-4" },
];

document.addEventListener("DOMContentLoaded", () => {
  renderizarDashboardInformativo(configuracaoCardsInformativos);
});