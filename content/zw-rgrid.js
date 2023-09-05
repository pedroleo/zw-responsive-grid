/**
 *
 * Controla a funcionalidade de abrir/fechar
 * dos detalhes dos vôos adicionando ".expanded"
 * para controle por css.
 *
 * Escopo: mobile.
 */


document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll(".zw-rgrid-header-mobile").forEach(function (item, index) {
        item.addEventListener("click", function () {
            this.closest('tr').classList.toggle("expanded");
        })
    });

}, false);