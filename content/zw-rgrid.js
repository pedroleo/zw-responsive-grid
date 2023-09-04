/**
 * Tabela de resultado de voos.
 *
 * Controla a funcionalidade de abrir/fechar
 * dos detalhes dos vôos adicionando ".expanded"
 * para controle por css.
 *
 * Escopo: mobile.
 */

$(document).on('click', '.zw-rgrid .zw-header-mobile', function () {
    $(this).parent().toggleClass("expanded");
})