//var papi = 'https://api.des.caixa:8443/portalapi';
var papi = 'http://portalapi-rest-dev.nprd2.caixa/portalapi';


$(document).ready(function(){
    $(".chosen-select").chosen();
    getGroups();
    getAllAPIs()
    const urlParams = new URLSearchParams(window.location.search);
    const api = urlParams.get('api');
    if (api) {
        getSwagger(api);
    }    
});

$("#groups").chosen().change(function() {
    console.log('Grupo alterado');
    $('#apis')
        .find('option')
        .remove()
        .end()
    ;
    if ($('#groups').val()=="all") {
        getAllAPIs();
    }else{
        getAPIs($('#groups').val());
    }
    
});

$("#apis").chosen().change(function() {
    console.log('API alterada');
    getSwagger($('#apis').val());
});